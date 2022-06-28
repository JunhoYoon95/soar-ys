function logfin_alert(status,msg,reload){
	Swal.fire({
		text: msg,
		icon: status,
		buttonsStyling: false,
		confirmButtonText: "확인",
		customClass: {
			confirmButton: "btn-sb btn-sb-blue rounded-pill btn-lg"
		}
	}).then(function () {
		//KTUtil.scrollTop();
		if(reload==1)
			location.reload();
		
	});	
}

function logfin_toast(name,group_name,customer_name,step_content,uid,created){
	// Select elements
	$("#notice_alarm").removeClass("d-none");
	$("#check_all_alarms").addClass("d-none");
	
	const button = document.getElementById('kt_docs_toast_stack_button');
	const container = document.getElementById('kt_docs_toast_stack_container');
	const targetElement = document.querySelector('[data-kt-docs-toast="stack"]'); // Use CSS class or HTML attr to avoid duplicating ids
	
	$("#toast-title").html("<div class='fs-6'><span class='text-dark fw-bolder'>"+name+"</span><span class='badge bg-soft-navy text-navy mx-1 px-2 py-1'>"+group_name+"</span> <span class='fs-9 text-600 fw-normal'>"+created.substr(0,20)+"</span> </div>" );
	$("#toast-msg").html("<div class='d-flex justify-content-between fs-6'><div class='text-dark'> <span class='text-blue fw-bold'>"+customer_name+"</span> 고객님 <span class='ms-1 text-blue fw-bold'>"+step_content+"</span> 알림입니다.</div><div class='fs-10 btn btn-danger rounded-2 px-2 py-1'>바로가기</div> </div>");
	$("#toast-link").attr("href","/loan_detail/"+uid);
	
	// Remove base element markup
	//targetElement.parentNode.removeChild(targetElement);


    // Create new toast element
    const newToast = targetElement.cloneNode(true);
    container.append(newToast);

    // Create new toast instance --- more info: https://getbootstrap.com/docs/5.1/components/toasts/#getorcreateinstance
    const toast = bootstrap.Toast.getOrCreateInstance(newToast);
    
    

    // Toggle toast to show --- more info: https://getbootstrap.com/docs/5.1/components/toasts/#show
    toast.show();
}

var s3;
function aws_init(){

	// logfin 설정
	var albumBucketName = 'logfinbucket';
	var bucketRegion = 'ap-northeast-2';
	var IdentityPoolId = 'ap-northeast-2:7eca9091-2563-4e62-9210-5fab57ffdf65';



	//var albumBucketName = 'fishingculture-album';
	//var bucketRegion = 'ap-northeast-2';
	//var IdentityPoolId = 'ap-northeast-2:d06483b1-c731-4ab1-bf70-9cf54657df43';
		
	
	AWS.config.update({
	  region: bucketRegion,
	  credentials: new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: IdentityPoolId
	  })
	});
	
	s3 = new AWS.S3({
	  apiVersion: '2006-03-01',
	  params: {Bucket: albumBucketName}
	});		
	
}

function addFile(albumName) {
  aws_init();
  var files = document.getElementById('file-upload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
      
  var rand_num = Date.now();
  var rand_num2 = Math.floor(100000 + Math.random() * 900000);
  var rand_num3 = Math.floor(100000 + Math.random() * 900000);
  
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(file.name)[1];
  
  var fileName = rand_num +"_"+ rand_num2 + "_" + rand_num3 + "." + ext;
  
  var albumPhotosKey = encodeURIComponent(albumName) + '/';

  var photoKey = albumPhotosKey + fileName;
  s3.upload({
    Key: photoKey,
    Body: file,
    ACL: 'public-read'
  }, function(err, data) {
    if (err) {
      return alert('There was an error uploading your photo: ', err.message);
    }

    //alert(data.Location);
	
	    var file_location = data.Location;
	    file_location = file_location.replace("https://logfinbucket.s3.ap-northeast-2.amazonaws.com","https://image.logfin.kr");
		//console.log(decodeURI(file_location));
		page_update(decodeURI(file_location));	
	

  });
    
    

}


function addPhoto(albumName,user_id) {
  aws_init();
  var files = document.getElementById('file-upload').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
      
  var rand_num = Math.floor(100000 + Math.random() * 900000);
  var fileName = rand_num +"_"+ file.name;
  
  if (!files[0].name.match(/.(pdf|jpg|jpeg|png|gif)$/i)){
    logfin_alert("error",'pdf 또는 이미지파일 jpg, jpeg, png, gif 형식으로 업로드해주세요!',0);
    return;
  }else{
	
	  var albumPhotosKey = encodeURIComponent(albumName) + '/';
	
	  var photoKey = albumPhotosKey + fileName;
	  s3.upload({
	    Key: photoKey,
	    Body: file,
	    ACL: 'public-read'
	  }, function(err, data) {
	    if (err) {
	      return alert('There was an error uploading your photo: ', err.message);
	    }
	
	    //alert(data.Location);
	    var file_location = data.Location;
	    file_location = file_location.replace("https://logfinbucket.s3.ap-northeast-2.amazonaws.com","https://image.logfin.kr");
		
		page_update(file_location);	
		
	
	  });
	    	
  }
    
    

}

function addPhoto_quick(albumName) {
  aws_init();
  var files = document.getElementById('file-upload-quick').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
      
  var rand_num = Date.now();
  var rand_num2 = Math.floor(100000 + Math.random() * 900000);
  var rand_num3 = Math.floor(100000 + Math.random() * 900000);
  
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(file.name)[1];
  
  var fileName = rand_num +"_"+ rand_num2 + "_" + rand_num3 + "." + ext;
  
  if (!files[0].name.match(/.(pdf|jpg|jpeg|png|gif)$/i)){
    logfin_alert("error",'pdf 또는 이미지파일 jpg, jpeg, png, gif 형식으로 업로드해주세요!',0);
    return;
  }else{
	
	  var albumPhotosKey = encodeURIComponent(albumName) + '/';
	
	  var photoKey = albumPhotosKey + fileName;
	  s3.upload({
	    Key: photoKey,
	    Body: file,
	    ACL: 'public-read'
	  }, function(err, data) {
	    if (err) {
	      return alert('There was an error uploading your photo: ', err.message);
	    }
	
	    //alert(data.Location);
	    var file_location = data.Location;
	    file_location = file_location.replace("https://logfinbucket.s3.ap-northeast-2.amazonaws.com","https://image.logfin.kr");
		
		page_update_quick(file_location);	
		
	
	  });
	    	
  }
    
    

}

function addPhoto_quick2(albumName) {
  aws_init();
  var files = document.getElementById('file-upload-quick2').files;
  if (!files.length) {
    return alert('Please choose a file to upload first.');
  }
  var file = files[0];
      
  var rand_num = Date.now();
  var rand_num2 = Math.floor(100000 + Math.random() * 900000);
  var rand_num3 = Math.floor(100000 + Math.random() * 900000);
  
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(file.name)[1];
  
  var fileName = rand_num +"_"+ rand_num2 + "_" + rand_num3 + "." + ext;
  
  if (!files[0].name.match(/.(pdf|jpg|jpeg|png|gif)$/i)){
    logfin_alert("error",'pdf 또는 이미지파일 jpg, jpeg, png, gif 형식으로 업로드해주세요!',0);
    return;
  }else{
	
	  var albumPhotosKey = encodeURIComponent(albumName) + '/';
	
	  var photoKey = albumPhotosKey + fileName;
	  s3.upload({
	    Key: photoKey,
	    Body: file,
	    ACL: 'public-read'
	  }, function(err, data) {
	    if (err) {
	      return alert('There was an error uploading your photo: ', err.message);
	    }
	
	    //alert(data.Location);
	    var file_location = data.Location;
	    file_location = file_location.replace("https://logfinbucket.s3.ap-northeast-2.amazonaws.com","https://image.logfin.kr");
		
		page_update_quick2(file_location);	
		
	
	  });
	    	
  }
    
    

}


function toggle_params(filter_type,value){
	
	const urlParams = new URLSearchParams(window.location.search);
	urlParams.set('page', 1);
	if(filter_type=="loan_type"){
		
		var types = urlParams.getAll('type[]');

		urlParams.delete('type[]');
		if(types.includes(value)){
			types.forEach(function(type){
				if(type != value){						
					urlParams.append('type[]', type);
				}						
			});				
		}else{
			types.forEach(function(type){
				urlParams.append('type[]', type);						
			});					
			urlParams.append('type[]', value);
		}

		
		window.location.search = urlParams;
		return false;				
	}else if(filter_type=="status"){
		
		var types = urlParams.getAll('stats[]');

		urlParams.delete('stats[]');
		if(types.includes(value)){
			types.forEach(function(type){
				if(type != value){						
					urlParams.append('stats[]', type);
				}						
			});				
		}else{
			types.forEach(function(type){
				urlParams.append('stats[]', type);						
			});					
			urlParams.append('stats[]', value);
		}

		
		window.location.search = urlParams;
		return false;				
	}else if(filter_type=="step"){
		
		var types = urlParams.getAll('steps[]');
		value = $("#loan_status_filter").val();
		
		

		urlParams.delete('steps[]');
		if(types.includes(value)){
			types.forEach(function(type){
				if(type != value){						
					//urlParams.append('steps[]', type);
				}						
			});				
		}else{
			types.forEach(function(type){
				//urlParams.append('steps[]', type);						
			});					
			urlParams.append('steps[]', value);
		}
		
		if(value=="0"){
			urlParams.delete('steps[]');
		}

		
		window.location.search = urlParams;
		return false;				
	}else if(filter_type=="my"){
		
		urlParams.delete('del');
		if(value == "0"){
			urlParams.delete('my');
		}else{
			
			urlParams.append('my', "1");
		}
		
		window.location.search = urlParams;
		return false;				
	}else if(filter_type=="del"){
		urlParams.delete('my');
		if(value == "0"){
			urlParams.delete('del');
		}else{
			
			urlParams.append('del', "1");
		}
		
		window.location.search = urlParams;
		return false;				
	}else if(filter_type=="all"){
		
		urlParams.delete('my');
		urlParams.delete('del');
		window.location.search = urlParams;
		return false;				
	}
	
}