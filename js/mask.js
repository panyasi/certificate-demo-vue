
$(function(){
	const maskPage = {
		data:{
			user_name:'Jay',
			user_pic:null,
			sex_id:'男',
			province_id:2,
			city_id:52,
			career_status:2,
			career_type:"技术",
			school_year_enter:null,
			work_experience:1,
			career_interest:['120-1','119-2'],
			ca_status:null,
		},
		arrInterest:[],
		industryData:[{
			id: 1,
            name: '技术'
        },{
            id: 2,
            name: '产品'
        },{
            id: 3,
            name: '设计'
        },{
            id: 4,
            name: '测试'
        },{
            id: 5,
            name: '运营'
        },{
        	id:6,
        	name: '其他'
        }],
		workingYearData:[{
            id: 1,
            name: '1年以下'
        },{
            id: 2,
            name: '1-2年'
        },{
            id: 3,
            name: '3-5年'
        },{
            id: 4,
            name: '6-10年'
        },{
            id: 5,
            name: '10年以上'
        }],
        InterestData:[{
            item_id: 114,
            name: 'Web 前端工程师'
        },{
            item_id: 115,
            name: 'Android 开发工程师'
        },{
            item_id: 116,
            name: 'iOS 开发工程师'
        },{
            item_id: 117,
            name: 'GO 语言工程师'
        },{
            item_id: 118,
            name: 'Python Web 工程师'
        },{
            item_id: 119,
            name: 'PHP 工程师'
        },{
            item_id: 120,
            name: 'Java Web 工程师'
        }],
		init:function(){
			this.bind();
		},
		bind:function(){
			$('.showmask-btn').on('click',this.showMask);
 			$('body').on('click','.close-btn',this.closePage);
 			$('body').on('click','.user-basic-btn',this.userListShow);
			$('body').on('click','.user-sex-list .user-sex-item',{'arg':'Sex'},this.userSexSelect);
			$('body').on('click','.user-province-list .user-province-item',this.userProvinceSelect);
			$('body').on('click','.user-city-list .user-city-item',this.userCitySelect);
			$('body').on('click','.button-item',this.careerStatusSelect);
			$('body').on('click','.user-grade-list .user-grade-item',this.userGradeSelect);
			$('body').on('click','.user-enrollment-list .user-enrollment-item',this.userEnrollmentSelect);
			$('body').on('click','.user-industry-list .user-industry-item',this.userIndustrySelect);
			$('body').on('click','.user-workingyear-list .user-workingyear-item',this.userWorkingyearSelect);
			$('body').on('click','#next-btn.active',this.showSecondTemplete);
			$('body').on('click','.type-item',this.jobTypeSelct);
			$('body').on('click','#type-pre-btn',this.preFirstSectionShow);
			$('body').on('click','#type-next-btn.active',this.showThirdTemplete);
			$('body').on('click','.level-select',this.userLevelSelect);
			$('body').on('click','#level-pre-btn',this.preSecondSectionShow);
			$('body').on('mouseover','.item-level li',this.interestLevelLineOver);
			$('body').on('mouseout','.item-level li',this.interestLevelLineOut)
			$('body').on('click','#level-apply-btn.active',this.showFourthTemplete);
			$('body').on('click','#dynamic-code-send',this.dynamicCodeSend);
			$('body').on('input','#dynamic-code',this.entryDynamicCode);
			$('body').on('click','#binding-btn.active',this.showFifthTemplete);
		},
		showMask:function(){
			let html = `
			<div class="mask-container">
			</div>`
		    $('body').append(html);
		    maskPage.showFirstTemplete();
		},
		closePage:function(){
			$('.mask-container').remove();
		},
		showFirstTemplete:function(){
			let sex = maskPage.data.sex_id;
			let name = maskPage.data.user_name;
			let province = maskPage.data.province_id;
			let city = maskPage.data.city_id;
			let careerStatus = maskPage.data.career_status;
			let careerType = maskPage.data.career_type;
			let schoolYear = maskPage.data.school_year_enter;
			let workExperience = maskPage.data.work_experience;
			let provinceText = "省";
			let cityText = "市";
			let gradeText = "你所在的年级";
			let enrollmentText = "入学年份";
			let industryText = "您所从事的职业";
			let workExperienceText = "工作年限:"
			let dataIndex = null;
			let p_html = "";
			let c_html = "";
			let enrollment_html = maskPage.setEnrollment();
			if(careerType !==null && workExperience !== null){
				industryText = careerType;
				maskPage.workingYearData.forEach(w_data => {
					if(workExperience == w_data.id){
						workExperienceText = w_data.name;
					}
				})	
			};
			let industry_html = maskPage.industryData.map(i_data => {
				return `<li class="user-industry-item" data-value="${i_data.id}">${i_data.name}</li>`
			}).join('')
			console.log(industry_html)
			data_area.child.forEach((p_data,index) => {
				let p_id = p_data.id;
				let p_name = p_data.name;
				var appendOptions = `<li class="user-province-item" data-value="${p_id}">${p_name}</li>`
				p_html += appendOptions
				if(province == p_id){
					provinceText = p_name;
					dataIndex = index;
				}
			});
			data_area.child[dataIndex].child.forEach(c_data =>{
				let c_id = c_data.id;
				let c_name = c_data.name;
				var appendOptions = `<li class="user-city-item" data-value="${c_id}">${c_name}</li>` 
				c_html += appendOptions
				if(city == c_id){
					cityText = c_name
				}
			});
			console.log(careerStatus==2 ?'active' : '')
			let html = `
				<div class="maskshield"></div>
				<div class="step-1-section">
					<div class="close-btn">
						<img src="./images/close.png" alt="logo">
					</div>	
					<div class="head-box">
						<div class="title-container">
							<p class="title">成为认证学员</p>
							<p class="title-desc">成为极客学院认证学员，点亮专属身份标识，<span>免费观看</span>全站 80% 以上会员课程。</p>
						</div>
						<div class="step-container">
							第 1 步<span class="total-step"> / 共 3 步</span>
						</div>
					</div>
					<div class="content-box">
						<div class="list-1">
							<div class="user-avatar">
								<img src="./images/head.png" alt="logo">
							</div>
							<p class="user-name">${name}</p>
						</div>
						<div class="list-2">
							<div class="user-info-item">
								<div class="user-sex-item">
									<span class="button-label">性别：</span>
									<div class="user-sex-select">
										<button id="user-sex-btn" class="user-basic-btn" data-value="${sex}">${sex}</button>
										<ul class="user-sex-list">
											<li class="user-sex-item" data-value="男">男</li>
											<li class="user-sex-item" data-value="女">女</li>
										</ul>
									</div>
								</div>
								<div class="user-site-item">
									<span class="button-label">现居住地：</span>
									<div class="user-province-select">
										<button id="user-province-btn" class="user-basic-btn" data-value="${province}">${provinceText}</button>
										<ul class="user-province-list">
											${p_html}
										</ul>
									</div>
									<div class="user-city-select">
										<button id="user-city-btn" class="user-basic-btn" data-value="${city}">${cityText}</button>
										<ul class="user-city-list">
											${c_html}
										</ul>
									</div>
								</div>
							</div>
							<div class="user-career-item">
								<span class="button-label">您的当前状态：</span>
								<div class="user-career-select">
									<div class="user-student">
										<div class="button-item ${careerStatus == 1 ? 'active' : ''}" data-value="1">学生</div>
									</div>
									<div class="user-employee">
										<div class="button-item ${careerStatus == 2 ? 'active' : ''}" data-value="2">在职</div>
									</div>
									<div class="user-unemployed">
										<div class="button-item ${careerStatus == 3 ? 'active' : ''}" data-value="3">待业</div>
									</div>
								</div>
							</div>
							<div class="user-situation-item">
								<div class="user-grade-select" style="display:${careerStatus == 1 ? 'block' : 'none'}">
									<button class="user-basic-btn" id="user-grade-btn" data-value="${careerType}">${careerStatus == 1 && careerType!==null ? careerType : '你所在年级'}</button>
									<ul class="user-grade-list">
										<li class="user-grade-item" data-value="高中及以下">高中及以下</li>
										<li class="user-grade-item" data-value="专科">专科</li>
										<li class="user-grade-item" data-value="大学本科">大学本科</li>
										<li class="user-grade-item" data-value="研究生及以上">研究生及以上</li>
									</ul>
								</div>
								<div class="user-enrollment-select" style="display:${careerStatus == 1 ? 'block' : 'none'}">
									<button class="user-basic-btn" id="user-enrollment-btn" data-value="${schoolYear}">${careerStatus == 1 && schoolYear!==null ? schoolYear : "入学年份"}</button>
									<ul class="user-enrollment-list">
										${enrollment_html}
									</ul>
								</div>
								<div class="user-industry-select" style="display:${careerStatus == 2 ? 'block' : 'none'}">
									<button class="user-basic-btn" id="user-industry-btn" data-value="${careerType}">${careerStatus == 2 && careerType!==null ? careerType : "您所从事的职业"}</button>
									<ul class="user-industry-list">
										${industry_html}
									</ul>
								</div>
								<div class="user-workingyear-select" style="display:${careerStatus == 2 ? 'block' : 'none'}">
									<button class="user-basic-btn" id="user-workingyear-btn" data-value="${workExperience}">${careerStatus == 2 && workExperience!==null ? workExperienceText : "工作年限:"}</button>
									<ul class="user-workingyear-list">
										<li class="user-workingyear-item" data-value="1">1年以下</li>
										<li class="user-workingyear-item" data-value="2">1-2 年</li>
										<li class="user-workingyear-item" data-value="3">3-5年</li>
										<li class="user-workingyear-item" data-value="4">6-10年</li>
										<li class="user-workingyear-item" data-value="5">10年以上</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="check-box">
						<button class="next-btn" id="next-btn">下一步</button>
					</div>
				</div>
				`
				console.log(careerStatus == 2 && workExperience!==null ? workExperienceText : "工作年限:")
			$('.mask-container').html(html);
			maskPage.heightLightBtn();
		},
		setEnrollment:function(){
			var enrollment_html = '';
			var startdate = 1976;
			var enddate = new Date().getUTCFullYear();
			for(var i = enddate; i > startdate;i--){
				var appendOptions = `<li class="user-enrollment-item" data-value="${i}">${i}</li>`
				enrollment_html += appendOptions;
			}
			return enrollment_html;
		},
		userListShow:function(){
			$(this).next().addClass('active')
		},
		userSexSelect:function(event){
			var arg = event.data.arg
			console.log(arg)
			$('.user-sex-list').removeClass('active');			
			var thisValue = $(this).data('value');
			maskPage.data.sex_id = thisValue
			$('#user-sex-btn').attr('data-value',thisValue);
			$('#user-sex-btn').text(thisValue);
			maskPage.heightLightBtn();
		},
		userProvinceSelect:function(){
			var thisValue = $(this).data('value');
			var thisText = $(this).text();
			$('#user-province-btn').attr('data-value',thisValue);
			$('#user-province-btn').text(thisText);
			var provinceIndex = $(this).index();
			maskPage.data.province_id = thisValue;
			maskPage.data.city_id = null;
			$('.user-city-list').addClass('active');
			$('.user-province-list').removeClass('active');
			$('#user-city-btn').attr('data-value','');
			$('#user-city-btn').text('市');
			maskPage.heightLightBtn();
		},
		userCitySelect:function(){
			var thisText = $(this).text();
			var thisValue = $(this).data('value');
			maskPage.data.city_id = thisValue;
			$('#user-city-btn').attr('data-value',thisValue);
			$('#user-city-btn').text(thisText);
			$('.user-city-list').removeClass('active');
			maskPage.heightLightBtn(); 
		},
		careerStatusSelect:function(){
			var thisValue = $(this).data('value');
			maskPage.data.career_status = thisValue;
			$('.button-item').removeClass('active')
            $(this).addClass('active')
			switch(thisValue){
                case 1:
                    $('.user-grade-select').show();
                    $('.user-enrollment-select').show();
                    $('.user-industry-select').hide();
                    $('.user-workingyear-select').hide();
                    maskPage.data.career_type = null;
                    maskPage.data.work_experience = null;
                    $('.user-industry-btn').text('您所从事的职业')
                    $('.user-workingyear-btn').text('工作年限:')
                    console.log(maskPage.data,'value=1')
                    break;
                case 2:
                    $('.user-grade-select').hide();
                    $('.user-enrollment-select').hide();
                    $('.user-industry-select').show();
                    $('.user-workingyear-select').show();
                    maskPage.data.career_type=null;
                    maskPage.data.school_year_enter=null;
                    $('.user-grade-btn').text('你所在年级');
                    $('user-enrollment-btn').text('入学年份');
                    console.log(maskPage.data,'value=2')
                    break;
                case 3:
                    $('.user-grade-select').hide();
                    $('.user-enrollment-select').hide();
                    $('.user-industry-select').hide();
                    $('.user-workingyear-select').hide();
                    $('.user-industry-btn').text('您所从事的职业');
                    $('.user-workingyear-btn').text('工作年限:');
                    $('.user-grade-btn').text('你所在年级');
                    $('user-enrollment-btn').text('入学年份');
                    maskPage.data.career_type=null;
                    maskPage.data.work_experience=null;
                    maskPage.data.school_year_enter=null;
                    console.log(maskPage.data,'value=3')
                    break;
            }
            maskPage.heightLightBtn();
		},
		userGradeSelect:function(){
			var thisText = $(this).text();
			var thisValue = $(this).data('value');
			maskPage.data.career_type = thisValue;
			$('#user-grade-btn').attr('data-value',thisValue);
			$('#user-grade-btn').text(thisText);
			$('.user-grade-list').removeClass('active');
			maskPage.heightLightBtn();
		},
		userEnrollmentSelect:function(){
			var thisText = $(this).text();
			var thisValue = $(this).data('value');
			maskPage.data.school_year_enter = thisValue;
			$('#user-enrollment-btn').attr('data-value',thisValue);
			$('#user-enrollment-btn').text(thisText);
			$('.user-enrollment-list').removeClass('active');
			maskPage.heightLightBtn();
		},
		userIndustrySelect:function(){
			var thisText = $(this).text();
			var thisValue = $(this).data('value');
			if(maskPage.data.career_status == 2){
				maskPage.data.career_type = thisValue;
			}else{
				maskPage.data.career_type = null;
			}
			$('#user-industry-btn').attr('data-value',thisValue);
			$('#user-industry-btn').text(thisText);
			$('.user-industry-list').removeClass('active');
			maskPage.heightLightBtn();
		},
		userWorkingyearSelect:function(){
			var thisText = $(this).text();
			var thisValue = $(this).data('value');
			maskPage.data.work_experience = thisValue;
			$('#user-workingyear-btn').attr('data-value',thisValue);
			$('#user-workingyear-btn').text(thisText);
			$('.user-workingyear-list').removeClass('active');
			maskPage.heightLightBtn();
			console.log(maskPage.data)
		},
		heightLightBtn:function(){
			let hasSexId = maskPage.data.sex_id !== null;
			let hasProvinceId = maskPage.data.province_id !== null;
			let hasCityId = maskPage.data.city_id !== null;
			let hasCareerType = maskPage.data.career_type !== null;
			let hasSchoolYearEnter = maskPage.data.school_year_enter !== null;
			let workExperience = maskPage.data.work_experience !== null;
			if(hasSexId && hasProvinceId && hasCityId && hasCareerType && hasSchoolYearEnter){
				$('#next-btn').addClass('active');
				console.log('777not')
			}else if(hasSexId && hasProvinceId && hasCityId && hasCareerType && workExperience){
				$('#next-btn').addClass('active');
				console.log('999bit')
			}else if(hasSexId && hasProvinceId && hasCityId && maskPage.data.career_status==3){
				$('#next-btn').addClass('active');
				console.log('0000000')
			}else{
				$('#next-btn').removeClass('active');
			}
		},
		showSecondTemplete:function(){
			let arrInterest = maskPage.data.career_interest.map(data => Number(data.split('-')[0]));
			console.log(arrInterest)
			let html = `
				<div class="maskshield"></div>
				<div class="step-2-section">
					<div class="close-btn">
						<img src="./images/close.png" alt="logo">
					</div>
					<div class="head-box">				
						<div class="title-container">
							<p class="title">成为认证学员</p>
							<p class="title-desc">成为极客学院认证学员，点亮专属身份标识，<span>免费观看</span>全站 80% 以上会员课程。</p>
						</div>
						<div class="step-container">
							<span class="current-step">第 2 步</span><span class="total-step"> / 共 3 步</span>
						</div>
					</div>
					<div class="content-box">
						<p class="type-title">选择你感兴趣的职业方向（最多可选择 3 项）<span>系统将根据您的选择为您推荐合适的课程</span></p>
						<div class="type-list">
							<div class="${arrInterest.indexOf(114) >= 0? 'type-item active':'type-item'}" id="type-web" data-value="114">Web 前端工程师</div>
							<div class="${arrInterest.indexOf(115) >= 0? 'type-item active':'type-item'}" id="type-android" data-value="115">Android 开发工程师</div>
							<div class="${arrInterest.indexOf(116) >= 0? 'type-item active':'type-item'}" id="type-ios" data-value="116">iOS 开发工程师</div>
							<div class="${arrInterest.indexOf(117) >= 0? 'type-item active':'type-item'}" id="type-go" data-value="117">GO 语言工程师</div>
							<div class="${arrInterest.indexOf(118) >= 0? 'type-item active':'type-item'}" id="type-python" data-value="118">Python Web工程师</div>
							<div class="${arrInterest.indexOf(119) >= 0? 'type-item active':'type-item'}" id="type-php" data-value="119">PHP 工程师</div>
							<div class="${arrInterest.indexOf(120) >= 0? 'type-item active':'type-item'}" id="type-java" data-value="120">Java Web 工程师</div>
						</div>
					</div>
					<div class="check-box">
						<button class="type-pre-btn" id="type-pre-btn">上一步</button>
						<button class="${arrInterest.length > 0 ? 'type-next-btn active' : 'type-next-btn'}" id="type-next-btn">下一步</button>
					</div>
				</div>`
			$('.mask-container').html(html)
		},
		jobTypeSelct:function(){
			var interestActive = $(this).data('value');
			var strInterestActive = interestActive + '-' + 0;
			var arrCareerInterest = maskPage.data.career_interest;
			let tmpIndex = null;
			let hasKey = false;
			
			arrCareerInterest.forEach((data,index) => {
				let typeId = data.split('-')[0];
				if( typeId == interestActive){
					tmpIndex = index;
					hasKey = true
				}
			})
			if(hasKey){
				arrCareerInterest.splice(tmpIndex,1);
				$(this).removeClass('active')
			}else if(arrCareerInterest.length < 3){
				arrCareerInterest.push(strInterestActive);
				console.log(arrCareerInterest,"push")
				$(this).addClass('active');
			}
			if(arrCareerInterest.length ==0){
				$('#type-next-btn').removeClass('active');
			}else{
				$('#type-next-btn').addClass('active')
			}
		},
		preFirstSectionShow:function(){
			maskPage.showFirstTemplete();
		},
		showThirdTemplete:function(){
			var setInterestLevel = maskPage.setInterestLevel();
			let html = `
			<div class="maskshield"></div>
			<div class="step-3-section">
				<div class="close-btn">
					<img src="./images/close.png" alt="logo">
				</div>
				<div class="head-box">
					<div class="title-container">
						<p class="title">成为认证学员</p>
						<p class="title-desc">成为极客学院认证学员，点亮专属身份标识，<span>免费观看</span>全站 80% 以上会员课程。</p>
					</div>
					<div class="step-container">
						<span class="current-step">第 3 步</span><span class="total-step"> / 共 3 步</span>
					</div>
				</div>
				<div class="content-box">
					<p class="level-title">您在这些方向上当前的水平如何？<span>系统将根据您的选择为您推荐合适的课程</span></p>
					<div class="level-list-container">				
						${setInterestLevel}
					</div>
				</div>
				<div class="check-box">
					<button class="level-pre-btn" id="level-pre-btn">上一步</button>
					<button class="level-apply-btn" id="level-apply-btn">申请认证</button>
				</div>
			</div>`
			$('.mask-container').html(html);
			maskPage.showLevelBtn();
		},
		setInterestLevel:function(){
			let InterestData    = maskPage.InterestData;
			let career_interest = maskPage.data.career_interest;
			let html = '';
			InterestData.forEach( i_data =>{
				career_interest.forEach( (c_data,index) => {
					let typeData = c_data.split('-')[0];
					let levelData = c_data.split('-')[1];
					if(i_data.item_id == typeData){
						let levelList = `
							<div class="level-list">
								<p class="list-title">${i_data.name}</p>
								<ul class="item-level">
									<li class="level-select ${levelData == 1?'active':''}" data-id="${i_data.item_id}" data-value="1">完全不了解</li>
									<li class="level-select ${levelData == 2?'active':''}" data-id="${i_data.item_id}" data-value="2">有点了解</li>
									<li class="level-select ${levelData == 3?'active':''}" data-id="${i_data.item_id}" data-value="3">熟悉</li>
									<li class="level-select ${levelData == 4?'active':''}" data-id="${i_data.item_id}" data-value="4">精通</li>
								</ul>
								<span class="light-1 ${levelData <= 4? 'active':''}" ></span>
								<span class="light-2 ${levelData ==2 || levelData ==3 || levelData ==4? 'active':''}"></span>
								<span class="light-3 ${levelData ==3 || levelData ==4? 'active':''}"></span>
								<span class="light-4 ${levelData == 4 ? 'active':''}"></span>
							</div>`;
						html += levelList;
					}
				})
			});
			return html;
		},
		userLevelSelect:function(){
			var thisId = $(this).data('id');
			var thisParent = $(this).parents('.level-list');
			var thisValue = $(this).data('value');
			var x = $('.light-1')
			console.log($('thisParent.light-1'))
			var thisInterest = thisId +'-'+ thisValue;
			var haskey = false;
			var tmpIndex = null;
			var thisLevel = null;
			maskPage.data.career_interest.forEach((data,index)=>{
				let i_key = data.split('-')[0];
				let l_key = data.split('-')[1];
				console.log(thisValue)
				if(i_key == thisId){
					thisLevel = l_key
					haskey = true;
					tmpIndex = index;
				};
				if(thisValue == 0){
					thisParent.find('span:lt(4)').removeClass('active')
				}
				if(thisValue == 1){
					thisParent.find('.light-1').addClass('active')
					thisParent.find('span:gt(2)').removeClass('active')
				};
				if(thisValue == 2){
					thisParent.find('span:lt(2)').addClass('active')
					thisParent.find('span:gt(2)').removeClass('active')
				};
				if(thisValue == 3){
					thisParent.find('span:lt(3)').addClass('active')
					thisParent.find('.light-4').removeClass('active')
				};
				if(thisValue == 4){
					thisParent.find('span:lt(4)').addClass('active')
				};
			})
			if(thisLevel==thisValue){
				thisParent.find('span:lt(4)').removeClass('active')
			}
			if(!haskey){
				maskPage.data.career_interest.push(thisInterest);
				$(this).addClass('active')
			}else{
				if(maskPage.data.career_interest.indexOf(thisInterest)===-1){
					maskPage.data.career_interest.splice(tmpIndex,1,thisInterest);
					$(this).toggleClass('active');
					$(this).siblings().removeClass('active')
				}else{
					var i = maskPage.data.career_interest.indexOf(thisInterest)
					thisInterest = thisId +'-'+ 0;
					maskPage.data.career_interest.splice(i,1,thisInterest);
					$(this).removeClass('active');
				}	
			};
			maskPage.showLevelBtn();

			console.log(maskPage.data.career_interest)

		},
		showLevelBtn:function(){
			var arrLevel = []
			maskPage.data.career_interest.forEach((data,index)=>{
				let l_key = data.split('-')[1];
				arrLevel.push(Number(l_key))
				console.log(arrLevel)
				if(arrLevel.indexOf(0)>=0){
					$('#level-apply-btn').removeClass('active')
				}else{
					$('#level-apply-btn').addClass('active')
				};
			})
		},
		interestLevelLineOver:function(){
			let level = this.getAttribute('data-value');
			var lineIndex = null;
			switch(level){
			    case '1':
			    lineIndex = 1;
			    break;
			    case '2':
			    lineIndex = 2;
			    break;
			    case '3':
			    lineIndex = 3;
			    break;
			    case '4':
			    lineIndex = 4;
			    break;
			}
			var thisParent = $(this).parents('.level-list');
			thisParent.find('span').removeClass('active');
			thisParent.children(`span:lt(${lineIndex})`).addClass('active')
		},
		interestLevelLineOut:function(){
            let dataId = this.getAttribute('data-id');
            var level = ''

            maskPage.data.career_interest.forEach(function(data,index){
                data = data.split("-")
                if(data[0] == dataId){
                    level = data[1]
                }
            })

            var lineIndex = null;
            switch(level){
                case '1':
                lineIndex = 1;
                break;
                case '2':
                lineIndex = 2;
                break;
                case '3':
                lineIndex = 3;
                break;
                case '4':
                lineIndex = 4;
                break;
            }
            var thisParent = $(this).parents('.level-list');
			thisParent.find('span').removeClass('active');
			thisParent.children(`span:lt(${lineIndex})`).addClass('active');
        },
		preSecondSectionShow:function(){
			maskPage.showSecondTemplete();
		},
		showFourthTemplete:function(){
			let setImgCode = maskPage.setImgCode();
			let html = `
			<div class="maskshield"></div>
				<div class="binding-section">
					<div class="close-btn">
						<img src="./images/close.png" alt="logo">
					</div>
					<div class="head-box">
						<div class="title-container">
							<p class="title">绑定手机 完成认证</p>
							<p class="title-desc">请您绑定手机防止账号丢失和被盗，手机号可用于登录和找回密码。</p>
						</div>
					</div>
					<div class="content-box">
						<div class="form-phone-number">
							<input type="text" value placeholder="请输入手机号码" class="phone-number" id="phone-number" name="phone-number">
							<span class="alert-number"></span>
						</div>
						<div class="form-verify-code">
							<input type="text" value placeholder="请输入验证码" class="verify-code" id="verify-code" name="verify-code">
							<span class="alert-code"></span>
							<div class="verify-pic">
								<img src="${setImgCode}" alt="">
							</div>
						</div>
						<div class="form-dynamic-code">
							<input type="text" value placeholdere="请输入动态码" class="dynamic-code" id="dynamic-code" name="dynamic-code">
							<button type="button"  class="dynamic-code-send" id="dynamic-code-send" name="dynamic-code-send">获取</button>
						</div>
					</div>
					<div class="check-box">
						<button class="binding-btn" id="binding-btn">绑定手机</button>
					</div>
				</div>
			</div>`
			$('.mask-container').html(html);
		},
		setImgCode:function(){
			let getImgCodeUrl = 'https://huodong.jikexueyuan.com/jike1024/verifyCode';
            var imgCode = getImgCodeUrl+ '?' + new Date().getTime();
            return imgCode;
		},
		dynamicCodeSend:function(){
			var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
		    var phone = $('#phone-number').val()
		    var flag = myreg.test(phone)
		    var myreg2 = /^\d{4}$/;
			var code  = $('#verify-code').val();
			var flag2 = myreg2.test(code);
			if($('#phone-number').val()==""){
				$('#phone-number').css('border','1px solid red');
				$('.alert-number').text('不能为空');
			}else{
			    if(flag){
			    	$('#phone-number').css('border','1px solid #e4e4e4');
					$('.alert-number').text('')
			    }else{
			    	$('.alert-number').text('输入错误')
			    }
			};
			if($('#verify-code').val()==""){
				$('#verify-code').css('border','1px solid red');
				$('.alert-code').text('不能为空');
			}else{
				if(flag2){
					$('#verify-code').css('border','1px solid #e4e4e4');
					$('.alert-code').text('');
				}else{
					$('.alert-code').text('输入错误');
				}
			};
			if(flag&&flag2){
				maskPage.countDown();
			};
		},
		countDown:function(){
			let count = 60;
			var st = setInterval(()=>{
				if (count > 1) {
					count --;
					console.log(count)
					let dynamicCodeSendCount =  '已发送'+'' + '(' + count + ')';
					$('#dynamic-code-send').text(dynamicCodeSendCount);
					$('#dynamic-code-send').attr('disabled', true);
				}else{
					clearInterval(st);
					$('#dynamic-code-send').text('获取');
					$('#dynamic-code-send').attr('disabled', false);
				}
			},1000);
			
		},
		entryDynamicCode:function(e){
			if($(this).val()!==""){
				$('#binding-btn').addClass('active')
			}else{
				$('#binding-btn').removeClass('active');
			};
		},
		showFifthTemplete:function(){
			let html = `
			<div class="maskshield"></div>
			<div class="finish-section">
				<div class="close-btn">
					<img src="./images/close.png" alt="logo">
				</div>
				<div class="head-box">
					<div class="user-avatar">
						<img src="./images/head.png" alt="logo">
					</div>
					<p class="user-name">jikeRyan</p>
					<p class="title">恭喜，完成认证！</p>
					<p class="title-desc">现在你可以免费观看 80% 以上会员课程</p>
					<a href="javascript:;">马上去学习 >></a>
				</div>
				<div class="content-box">
					<p class="recommend">为您推荐如下课程</p>
					<p class="list-title">职业学院</p>
					<div class="lesson-list">
						<div class="lesson-item">
							<div class="lesson-img">
								<img src="./images/class.png" alt="logo">
							</div>
							<div class="lesson-detail">
								<p class="lesson-name">Python Web 工程师成长计划</p>
								<p class="lesson-count">2314 人正在学习</p>
							</div>
							<a href="javascript:;"></a>
						</div>
						<div class="lesson-item">
							<div class="lesson-img">
								<img src="./images/class.png" alt="logo">
							</div>
							<div class="lesson-detail">
								<p class="lesson-name">Go 工程师成长计划</p>
								<p class="lesson-count">2314 人正在学习</p>
							</div>
							<a href="javascript:;"></a>
						</div>
					</div>
					<p class="list-title">会员课程</p>
					<div class="member-list">
						<li class="list-item"><a href="javascript:;">Tornado 开发--TCP 编程</a></li>
						<li class="list-item"><a href="javascript:;">开发远程控制程序高级功能</a></li>
						<li class="list-item"><a href="javascript:;">网页控制电脑</a></li>
						<li class="list-item"><a href="javascript:;">Python 类深入</a></li>
						<li class="list-item"><a href="javascript:;">Python 类初步</a></li>
						<li class="list-item"><a href="javascript:;">Python 初级项目：远程操控电脑</a></li>
					</div>
				</div>
			</div>`
			$('.mask-container').html(html);
		}
	}
	maskPage.init();
})