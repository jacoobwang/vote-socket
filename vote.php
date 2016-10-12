<?php

$file    = __dir__."\\vote.txt";
$data    = file_get_contents($file);
$dataArr = explode("|", $data);


if(isset($_POST['voted'])){
	//发送数据
	if(count($dataArr)<=4){
		file_put_contents($file, $_POST['voted']."|",FILE_APPEND);
		$data .= $_POST['voted']."|";
	}
	echo rtrim($data,"|");
}

if(isset($_POST["reset"])){
	file_put_contents($file,'');
	echo "success";
}

if(isset($_POST["refresh"])){
	echo rtrim($data,"|");
}

