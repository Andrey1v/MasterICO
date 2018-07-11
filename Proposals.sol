pragma solidity ^0.4.24;


// import "./ERC20.sol";
// import "./Ownable.sol";
// import "./SafeMath.sol";

import "./INV.sol";


contract Governance is INV {

    using SafeMath for uint;

    uint constant public ThresholdPercent = 10;
    uint constant public MinimumDuration = 1 weeks;

    uint canceled = 0;
    mapping (uint => address) cancelVoteIdToAddress;
    uint cancelVotesCounter;
    mapping (address => uint8) addressToCancelVote;

    struct Document {
        uint date;
        string url;
        uint documentHash;
    }

    struct Proposal {
        string name;

        uint openingTime;
        uint durationTime;
        uint requestedAmount;

        mapping (uint => Document) overviews;
        uint overviewsCounter;
        mapping (uint => Document) reports;
        uint reportsCounter;

        mapping (uint => address) voteIdToAddress;
        uint votesCounter;
        mapping (address => uint8) addressToVote;
    }

    Proposal[] public proposals;

    uint constant NoneVote = 0;
    uint constant YesVote = 1;
    uint constant NoVote = 2;
    uint constant AbstainedVote = 3;

    modifier notCanceled {
        require(canceled == 0);
        _;
    }

    modifier correctVote(uint _vote) {
        require(_vote == YesVote || _vote == NoVote || _vote == AbstainedVote);
        _;
    }

    modifier hasBalance {
        require(balanceOf(msg.sender) != 0);
        _;
    }

    function checkProposalExistence(string _name) public view returns(bool exist) {
        for (uint i = 0; i < proposals.length; i = i.add(1)) {
            if (keccak256(_name) == keccak256(proposals[i].name)) {
                return true;
            }
        }
        return false;
    }

    function addProposal(
        string _name,
        uint _durationTime,
        uint _requestedAmount,
        string _url,
        uint _documentHash) public onlyOwner notCanceled
    {
        require(!checkProposalExistence(_name));
        require(_durationTime >= MinimumDuration);

        uint proposalId = proposals.push(Proposal(_name, now, _durationTime, _requestedAmount, 0, 0, 0)) - 1;
        addOverview(proposalId, _url, _documentHash);
    }

    function addOverview(uint _proposalId, string _url, uint _documentHash) public onlyOwner notCanceled {
        proposals[_proposalId].overviews[proposals[_proposalId].overviewsCounter] = Document(now, _url, _documentHash);
        proposals[_proposalId].overviewsCounter = proposals[_proposalId].overviewsCounter.add(1);
    }

    function getOverviewsCounter(uint _proposalId) public view returns(uint overviewsCounter) {
        return proposals[_proposalId].overviewsCounter;
    }

    function getOverview(uint _proposalId, uint _overviewId) public view returns(uint date, string url, uint documentHash) {
        date = proposals[_proposalId].overviews[_overviewId].date;
        url = proposals[_proposalId].overviews[_overviewId].url;
        documentHash = proposals[_proposalId].overviews[_overviewId].documentHash;
    }

    function addReport(uint _proposalId, string _url, uint _documentHash) public onlyOwner notCanceled {
        proposals[_proposalId].reports[proposals[_proposalId].reportsCounter] = Document(now, _url, _documentHash);
        proposals[_proposalId].reportsCounter = proposals[_proposalId].reportsCounter.add(1);
    }

    function getReportsCounter(uint _proposalId) public view returns(uint reportsCounter) {
        return proposals[_proposalId].reportsCounter;
    }

    function getReport(uint _proposalId, uint _reportId) public view returns(uint date, string url, uint documentHash) {
        date = proposals[_proposalId].reports[_reportId].date;
        url = proposals[_proposalId].reports[_reportId].url;
        documentHash = proposals[_proposalId].reports[_reportId].documentHash;
    }

    function vote(uint _proposalId, uint8 _vote) public hasBalance correctVote(_vote) notCanceled {
        require(now <= proposals[_proposalId].openingTime + proposals[_proposalId].durationTime);

        if (proposals[_proposalId].addressToVote[msg.sender] == NoneVote) {
            proposals[_proposalId].voteIdToAddress[proposals[_proposalId].votesCounter] = msg.sender;
            proposals[_proposalId].votesCounter = proposals[_proposalId].votesCounter.add(1);
        }

        proposals[_proposalId].addressToVote[msg.sender] = _vote;
    }

    function currentProposalResults(uint _proposalId) public view returns(uint yes, uint no, uint abstain) {
        for (uint i = 0; i < proposals[_proposalId].votesCounter; i = i.add(1)) {
            uint currentVote = proposals[_proposalId].addressToVote[proposals[_proposalId].voteIdToAddress[i]];
            if (currentVote == YesVote) {
                yes = yes.add(balanceOf(msg.sender));
            } else if (currentVote == NoVote) {
                no = no.add(balanceOf(msg.sender));
            } else if (currentVote == AbstainedVote) {
                abstain = abstain.add(balanceOf(msg.sender));
            }
        }
    }

    function proposalResult(uint _proposalId) public view returns(bool success) {
        uint yes;
        uint no;
        uint abstain;
        (yes, no, abstain) = currentProposalResults(_proposalId);

        if (yes - no > (getTotalSupply() - abstain).mul(ThresholdPercent).div(100)) {
            return true;
        }
        return false;
    }

    function getProposalFunds(uint _proposalId) public onlyOwner notCanceled {
        require(proposals[_proposalId].openingTime + proposals[_proposalId].durationTime <= now);
        require(proposalResult(_proposalId));
        require(address(this).balance >= proposals[_proposalId].requestedAmount);

        owner.transfer(proposals[_proposalId].requestedAmount);
    }

    function cancelVote(uint8 _cancelVote) public hasBalance correctVote(_cancelVote) {
        if (addressToCancelVote[msg.sender] == NoneVote) {
            cancelVoteIdToAddress[cancelVotesCounter] = msg.sender;
            cancelVotesCounter = cancelVotesCounter.add(1);
        }

        addressToCancelVote[msg.sender] = _cancelVote;
    }

    function currentCancellationResults() public view returns(uint yes, uint no, uint abstain) {
        for (uint i = 0; i < cancelVotesCounter; i = i.add(1)) {
            uint currentVote = addressToCancelVote[cancelVoteIdToAddress[i]];
            if (currentVote == YesVote) {
                yes = yes.add(balanceOf(msg.sender));
            } else if (currentVote == NoVote) {
                no = no.add(balanceOf(msg.sender));
            } else if (currentVote == AbstainedVote) {
                abstain = abstain.add(balanceOf(msg.sender));
            }
        }
    }

    function cancel() public notCanceled {
        uint yes;
        uint no;
        uint abstain;
        (yes, no, abstain) = currentCancellationResults();
        require(yes - no > (getTotalSupply() - abstain).mul(ThresholdPercent).div(100));
        canceled = now;
    }

    function getRefun() public hasBalance {
        require(canceled != 0);
        msg.sender.transfer(address(this).balance.mul(balanceOf(msg.sender)).div(getTotalSupply()));
    }
}
