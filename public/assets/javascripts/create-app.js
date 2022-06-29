var KTCreateApp = function () {
	// Elements
	var modal;	
	var modalEl;

	var stepper;
	var form;
	var formSubmitButton;
	var formContinueButton;

	// Variables
	var stepperObj;
	var validations = [];

	// Private Functions
	var initStepper = function () {
		// Initialize Stepper
		stepperObj = new KTStepper(stepper);

		// Stepper change event(handle hiding submit button for the last step)
		stepperObj.on('kt.stepper.changed', function (stepper) {
			if (stepperObj.getCurrentStepIndex() === 4) {
				formSubmitButton.classList.remove('d-none');
				formSubmitButton.classList.add('d-inline-block');
				formContinueButton.classList.add('d-none');
			} else if (stepperObj.getCurrentStepIndex() === 5) {
				formSubmitButton.classList.add('d-none');
				formContinueButton.classList.add('d-none');
			} else {
				formSubmitButton.classList.remove('d-inline-block');
				formSubmitButton.classList.remove('d-none');
				if(info==1)
					formContinueButton.classList.remove('d-none');
			}
		});

		// Validation before going to next page
		stepperObj.on('kt.stepper.next', function (stepper) {
			
			console.log('stepper.next');

			// Validate form before change stepper step
			var validator = validations[stepper.getCurrentStepIndex() - 1]; // get validator for currnt step

			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');

					if (status == 'Valid') {
						$("#step_current").html("("+(stepperObj.getCurrentStepIndex()+1)+"/4)");
						$("#select_step_current").html("("+(stepperObj.getCurrentStepIndex()+1)+"/2)");
						stepper.goNext();

						//KTUtil.scrollTop();
					} else {
						// Show error message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
						Swal.fire({
							text: "Sorry, looks like there are some errors detected, please try again.",
							icon: "error",
							buttonsStyling: false,
							confirmButtonText: "Ok, got it!",
							customClass: {
								confirmButton: "btn btn-light"
							}
						}).then(function () {
							//KTUtil.scrollTop();
						});
					}
				});
			} else {
				stepper.goNext();
				
				KTUtil.scrollTop();
			}
		});

		// Prev event
		stepperObj.on('kt.stepper.previous', function (stepper) {
			
			
			console.log('stepper.previous');

			stepper.goPrevious();
			$("#step_current").html("("+(stepperObj.getCurrentStepIndex())+"/4)");
			$("#select_step_current").html("("+(stepperObj.getCurrentStepIndex())+"/2)");
			KTUtil.scrollTop();
		});

		formSubmitButton.addEventListener('click', function (e) {
			// Validate form before change stepper step
			var validator = validations[3]; // get validator for last form

			validator.validate().then(function (status) {
				console.log('validated!');

				if (status == 'Valid') {
					
					// 여기에서 처리해야 하는구나 처리한 다음에 go_next로 
					// ajax
					// create loan
					
					
					
					// Prevent default button action
					e.preventDefault();
					
					

					// Disable button to avoid multiple click 
					formSubmitButton.disabled = true;

					// Show loading indication
					formSubmitButton.setAttribute('data-kt-indicator', 'on');



					if(info==1){
						
						//대출희망금액 amount
						//대출유형 loan_type
						//고객이름 customername
						//주민등록번호 customerno1 customerno2
						//휴대폰번호 customercontact 
						//동의관련
						//연소득 income
						//소득형태 income_type
						//고용형태 job_type
						//주거소유형태 home_type
						//직장명 company_name
						//직장입사일(년월) company_start_year company_start_month
						//소유차량번호 car_regist_no
						
						var amount = $("#amount").val();
						var loan_type_id = $("#loan_type:checked").val();
						var customername = $("#customername").val();
						var registration_no = $("#customer_regno1").val()+"-"+$("#customer_regno2").val();
						var customercontact = $("#customercontact").val();
						var income = $("#income").val();
						var income_type_id = $("#income_type option:selected").val();
						var job_type_id = $("#job_type option:selected").val();
						var home_type_id = $("#home_type option:selected").val();
						var company_name = $("#company_name").val();
						var company_start_year = $("#company_start_year option:selected").val();
						var company_start_month = $("#company_start_month option:selected").val();
						var car_regist_no = $("#car_regist_no").val();
						
						
						
						
						
						
						$.ajax({
						    url: '/complete_info/'+uid,
						    traditional: true,
						    type: "POST",
						    async: false,
						    dataType: 'json',
						    data:{
						    	authenticity_token : atk,
						    	amount:amount,
						    	loan_type_id:loan_type_id,
						    	customername:customername,
						    	registration_no:registration_no,
						    	customercontact:customercontact,
						    	income:income,
						    	income_type_id:income_type_id,
						    	job_type_id:job_type_id,
						    	home_type_id:home_type_id,
						    	company_name:company_name,
						    	company_start_year:company_start_year,
						    	company_start_month:company_start_month,
						    	car_regist_no:car_regist_no
						    	
					
						    },
						    success: function (data, status, error) {
			
								formSubmitButton.removeAttribute('data-kt-indicator');
		
								// Enable button
								formSubmitButton.disabled = false;
		
								stepperObj.goNext();
								$("#buttons").addClass("d-none");	
								
								//KTUtil.scrollTop();	
						      
						    },
						    error: function (data, status, error) {
								Swal.fire({
									text: "Sorry, looks like there are some errors detected, please try again.",
									icon: "error",
									buttonsStyling: false,
									confirmButtonText: "Ok, got it!",
									customClass: {
										confirmButton: "btn btn-light"
									}
								}).then(function () {
									//KTUtil.scrollTop();
								});			    	
						      return false;
						    }
						});							
					}else if(info==0){
						
						var selected_offer_id = $("#select_offer:checked").val();
						$.ajax({
						    url: '/complete_select/'+selected_offer_id,
						    traditional: true,
						    type: "POST",
						    async: false,
						    dataType: 'json',
						    data:{
						    	authenticity_token : atk
					
						    },
						    success: function (data, status, error) {
			
								formSubmitButton.removeAttribute('data-kt-indicator');
		
								// Enable button
								formSubmitButton.disabled = false;
		
								stepperObj.goNext();
								$("#buttons").addClass("d-none");	
								
								//KTUtil.scrollTop();	
						      
						    },
						    error: function (data, status, error) {
								Swal.fire({
									text: "Sorry, looks like there are some errors detected, please try again.",
									icon: "error",
									buttonsStyling: false,
									confirmButtonText: "Ok, got it!",
									customClass: {
										confirmButton: "btn btn-light"
									}
								}).then(function () {
									//KTUtil.scrollTop();
								});			    	
						      return false;
						    }
						});							
					}
					
					
					
					
				} else {
					Swal.fire({
						text: "Sorry, looks like there are some errors detected, please try again.",
						icon: "error",
						buttonsStyling: false,
						confirmButtonText: "Ok, got it!",
						customClass: {
							confirmButton: "btn btn-light"
						}
					}).then(function () {
						KTUtil.scrollTop();
					});
				}
			});
		});
	}

	// Init form inputs
	var initForm = function() {
		// Expiry month. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_month"]')).on('change', function() {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_month');
        });

		// Expiry year. For more info, plase visit the official plugin site: https://select2.org/
        $(form.querySelector('[name="card_expiry_year"]')).on('change', function() {
            // Revalidate the field when an option is chosen
            validations[3].revalidateField('card_expiry_year');
        });
	}

	var initValidation = function () {
		// Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
		// Step 1
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					name: {
						validators: {
							notEmpty: {
								message: 'required'
							}
						}
					},
					category: {
						validators: {
							notEmpty: {
								message: 'required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));

		// Step 2
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					customername: {
						validators: {
							notEmpty: {
								message: '고객 성함을 입력해주세요'
							}
						}
					},
					customerno1: {
						validators: {
							notEmpty: {
								message: '주민등록번호 앞자리를 입력해주세요'
							}
						}
					},
					customerno2: {
						validators: {
							notEmpty: {
								message: '주민등록번호 뒷자리를 입력해주세요'
							}
						}
					},
					customercontact: {
						validators: {
							notEmpty: {
								message: '인증가능한 휴대폰 번호를 입력해주세요'
							}
						}
					},										
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));

		// Step 3
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'income': {
						validators: {
							notEmpty: {
								message: '연소득을 입력해주세요.'
							}
						}
					},
					'income_type': {
						validators: {
							notEmpty: {
								message: '소득구분을 선택해주세요'
							}
						}
					},
					'home_type': {
						validators: {
							notEmpty: {
								message: '주거형태를 선택해주세요'
							}
						}
					},
					'job_type': {
						validators: {
							notEmpty: {
								message: '고용형태를 선택해주세요'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));

		// Step 4
		validations.push(FormValidation.formValidation(
			form,
			{
				fields: {
					'company_start_month': {
						validators: {
							notEmpty: {
								message: '입사 월을 선택해주세요'
							}
						}
					},
					'company_start_year': {
						validators: {
							notEmpty: {
								message: '입사 연도를 선택해주세요'
							}
						}
					},
					'company_name': {
						validators: {
							notEmpty: {
								message: '직장명을 입력해주세요'
							}
						}
					},
					'card_cvv': {
						validators: {
							notEmpty: {
								message: 'CVV is required'
							},
							digits: {
								message: 'CVV must contain only digits'
							},
							stringLength: {
								min: 3,
								max: 4,
								message: 'CVV must contain 3 to 4 digits only'
							}
						}
					}
				},

				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					// Bootstrap Framework Integration
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		));
	}

	return {
		// Public Functions
		init: function () {
			// Elements
			modalEl = document.querySelector('#kt_modal_create_app');

			if (!modalEl) {
				return;
			}

			modal = new bootstrap.Modal(modalEl);

			stepper = document.querySelector('#kt_modal_create_app_stepper');
			form = document.querySelector('#kt_modal_create_app_form');
			formSubmitButton = stepper.querySelector('[data-kt-stepper-action="submit"]');
			formContinueButton = stepper.querySelector('[data-kt-stepper-action="next"]');

			initStepper();
			initForm();
			initValidation();
		}
	};
}();

// On document ready
KTUtil.onDOMContentLoaded(function() {
    KTCreateApp.init();
});