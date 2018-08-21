<?php

$uploaddir = './userFile/';

if(strtolower(substr($_FILES['userFile']['name'], -4)) == ".pdf" ){

	if(move_uploaded_file($_FILES['userFile']['tmp_name'], $uploaddir . $_FILES['userFile']['name'])){
		echo "OK";
	} else {
		echo "ERROR";
	}
	exit();
}
if(strtolower(substr($_FILES['proposalOverview']['name'], -4)) == ".pdf" ){

	if(move_uploaded_file($_FILES['proposalOverview']['tmp_name'], $uploaddir . $_FILES['proposalOverview']['name'])){
		echo "OK";
	} else {
		echo "ERROR";
	}
	exit();
}
if(strtolower(substr($_FILES['proposalReport']['name'], -4)) == ".pdf" ){

	if(move_uploaded_file($_FILES['proposalReport']['tmp_name'], $uploaddir . $_FILES['proposalReport']['name'])){
		echo "OK";
	} else {
		echo "ERROR";
	}
	exit();
}
?>