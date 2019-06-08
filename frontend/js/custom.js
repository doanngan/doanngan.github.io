$(document).ready(function(){
	$("#cot1").click(function(){
		alert("hello");
	});
	
	$("#btndangnhap").click(function(){
		var email=$("#email").val();
		var matkhau=$("#matkhau").val();
		
		$.ajax({
			url:"/minishop/api/KiemTraDangNhap",
			type:"Get",
			data:{
				email:email,
				matkhau:matkhau
			},
			success: function(value){
			if(value == "true"){
				duongdanhientai=window.location.href;
				duongdan=duongdanhientai.replace("dangnhap/","");
				window.location=duongdan;
			}else{

				$("#ketqua").text("sai ten dang nhap hoac mat khau !");

			}
		}
		})
		
	});
	
	$("#dangky1").click(function(){
		$(this).addClass("actived");
		$("#dangnhap1").removeClass("actived");
		duongdanhientai=window.location.href;
		duongdan=duongdanhientai.replace("dangnhap/","dangky/");
		window.location=duongdan;
	});
	
	$("#dangnhap2").click(function(){
		
		duongdanhientai=window.location.href;
		duongdan=duongdanhientai.replace("dangky/","dangnhap/");
		window.location=duongdan;
		
	});
	
	$(".btn-giohang").click(function(){
		var mamau=$(this).closest("tr").find(".mau").attr("data-mamau");
		var tenmau=$(this).closest("tr").find(".mau").text();
		var masize=$(this).closest("tr").find(".size").attr("data-masize");
		var tensize=$(this).closest("tr").find(".size").text();
		var soluong=$(this).closest("tr").find(".soluong").text();
		var masanpham=$("#tensp").attr("data-masp");
		var tensanpham=$("#tensp").text();
		var hinhanh=$("#hinhanh").attr("data-hinhanh");
		var giatien=$("#gia").attr("data-gia");
	
		$.ajax({
			url:"/minishop/api/ThemGioHang",
			type:"Get",
			data:{
				masanpham:masanpham,
				mamau:mamau,
				masize:masize,
				tensanpham:tensanpham,
				tenmau:tenmau,
				tensize:tensize,
				giatien:giatien,
				hinhanh:hinhanh,
				soluong:soluong
				
			},
			success: function(value){
				
			}
			}).done(function(){
				$.ajax({
					url:"/minishop/api/laysoluonggiohang",
					type:"Get",
					
					success: function(value){
						$(".idgiohang").find("div").addClass("soluong-giohang");
						$(".idgiohang").find("div").html("<span>"+ value+"</span>");
					}
					})
			});
	});
	
	TinhTongTienGH();
	function TinhTongTienGH(){
	var tongtiensp=0;
	$(".giatien").each(function(){
		var giatien=$(this).text();
		tongtiensp= tongtiensp + parseFloat(giatien);
		var formattongtien=tongtiensp.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
		$("#tongtien").html(formattongtien+" vnd");
	})
	}
	$(".soluong-tronggiohang").change(function(){
		var soluong =$(this).val();
		var giatien=$(".giatien").attr("data-giatien");
		var tong=soluong * parseFloat(giatien);
		var format=tong.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString();
		$(this).closest("tr").find(".giatien").html(format+"vnd");
		TinhTongTienGH();
		
		var mamau=$(this).closest("tr").find(".mau").attr("data-mamau");
		var masize=$(this).closest("tr").find(".size").attr("data-masize");
		var masanpham=$(this).closest("tr").find(".tensanpham").attr("data-masanpham");
		$.ajax({
			url:"/minishop/api/UpdateGioHang",
			type:"Get",
			data:{
				masanpham:masanpham,
				mamau:mamau,
				masize:masize,
				soluong:soluong
			},
			success: function(value){
				
			}
			})
	});
	
	$(".btnxoa-giohang").click(function(){
		var self=$(this);
		var mamau=$(this).closest("tr").find(".mau").attr("data-mamau");
		var masize=$(this).closest("tr").find(".size").attr("data-masize");
		var masanpham=$(this).closest("tr").find(".tensanpham").attr("data-masanpham");
		$.ajax({
			url:"/minishop/api/XoaGioHang",
			type:"Get",
			data:{
				masanpham:masanpham,
				mamau:mamau,
				masize:masize,
			},
			success: function(value){
				self.closest("tr").remove();
				TinhTongTienGH();
			}
			})
	});
	
	$("body").on("click",".paging-iteam",function(){
		var sotrang=$(this).text();
		var spbatdau= (sotrang-1)*5;

		$.ajax({
			url:"/minishop/api/LaySanPhamLimit",
			type:"Get",
			data:{
				spbatdau:spbatdau
			},
			success: function(value){
				var tbodysanpham= $("#table-sanpham").find("tbody");
				tbodysanpham.empty();
				tbodysanpham.append(value);
			}
			})
	});
	
	$("#checkall").change(function(){
		if(this.checked){
			$("#table-sanpham input").each(function(){
				$(this).attr("checked",true);
			})
		}else{
			$("#table-sanpham input").each(function(){
				$(this).attr("checked",false);
			})
		}
	});
	
	$("#btnxoa-sanpham").click(function(){
		
		$("#table-sanpham input:checked").each(function(){
			var masanpham = $(this).val();
			var self=$(this);
			$.ajax({
				url:"/minishop/api/xoasanphamtheoma",
				type:"Get",
				data:{
					masanpham:masanpham
				},
				success: function(value){
					self.closest("tr").remove();
				}
				})
			
		})
	});
		var files = [];
		var hinhanh="";
		$("#hinhanh").change(function(event){
			files = event.target.files;
			hinhanh=files[0].name;
			forms = new FormData();
			forms.append("file",files[0]);
			
			$.ajax({
				url:"/minishop/api/uploadfile",
				type:"POST",
				data:forms,
				contentType: false,
				processData: false,
				enctype: "multipart/form-data",
				success: function(value){

				}
				})
		});
		$("body").on("click",".them-chitiet",function(){
			$(this).remove();
			var chitietlor=$("#chitiet-sanpham").clone().removeAttr("id");
			
			$("#contenchitiet").append(chitietlor);
		});
		
		$("#btnthem-sanpham").click(function(event){
			event.preventDefault();
			var formdata= $("#formsanpham").serializeArray();
			json = {};
			arraychitiet=[];
			
			$.each(formdata,function(i,field){
				json[field.name]=field.value;
			});
		
			$("#contenchitiet > .chitiet-sanpham").each(function(){
				objectchitiet={};
				var mamau= $(this).find("#mamau").val();
				var masize= $(this).find("#masize").val();
				var soluong= $(this).find("#soluong").val();
				objectchitiet["mamau"]= mamau;
				objectchitiet["masize"]=masize;
				objectchitiet["soluong"]=soluong;
				
				arraychitiet.push(objectchitiet);
			});
			json["hinhanh"]=hinhanh;
			json["chitietsanpham"]=arraychitiet;
			
			console.log(json);
			$.ajax({
				url:"/minishop/api/themsanpham",
				type:"POST",
				data:{
					dataJson:JSON.stringify(json)
				},
				success: function(value){

				}
				})
		});
		$("body").on("click",".btnsua",function(){
			masanpham=$(this).attr("data-id");
			$.ajax({
				url:"/minishop/api/laydanhsachtheomasanpham",
				type:"POST",
				data:{
					masanpham:masanpham
				},
				success: function(value){
					$("#tensanpham").val(value.tensanpham);
					$("#giatien").val(value.giatien);
					$("#mota").val(value.mota);
					
					$("#danhmucsanpham").val(value.danhmucsanpham.madanhmuc);
					$("#contenchitiet").html("");
					var lengthchitiet=value.chitietsanpham.length;
					for(i=0;i<lengthchitiet;i++){
						var chitietlor=$("#chitiet-sanpham").clone().removeAttr("id");
						if(i<lengthchitiet-1){
							chitietlor.find(".them-chitiet").remove();
						}
						
						chitietlor.find("#mamau").val(value.chitietsanpham[i].mausanpham.mamau);
						chitietlor.find("#masize").val(value.chitietsanpham[i].sizesanpham.masize);
						chitietlor.find("#soluong").val(value.chitietsanpham[i].soluong);
						$("#contenchitiet").append(chitietlor);
					}
					
					
				}
				})
		});
		
		$("body").on("click",".btnchitiet",function(){
			masanpham=$(this).attr("data-id");
			$.ajax({
				url:"/minishop/api/laydanhsachtheomasanpham",
				type:"POST",
				data:{
					masanpham:masanpham
				},
				success: function(value){
				console.log(value);
					for(i=0;i<value.chitietsanpham.length;i++){
						var chitiet=JSON.stringify(" mau: "+value.chitietsanpham[i].mausanpham.temau+" - size: "+value.chitietsanpham[i].sizesanpham.tesize+"-soluong: "+value.chitietsanpham[i].soluong);
						var chitiet2 = $("#chuachitiet").append(chitiet);
					}
					
				}
				
			}).done(function(){
					$.ajax({
						url:"/minishop/api/laydanhsachtheomasanpham",
						type:"POST",
						data:{
							masanpham:masanpham
						},
						success: function(value){
							
							alert( $("#chuachitiet").text());
						}
						})
				});
					
				
		});
		
	var	masanpham="";
		$("body").on("click",".btnsua",function(){
			$("#btncapnhat-sanpham").removeClass("empty");
			$("#btnthoat-sanpham").removeClass("empty");
			$("#btnthem-sanpham").addClass("empty");
			masanpham=$(this).attr("data-id");
			
		});
		
		$("#btncapnhat-sanpham").click(function(event){
			event.preventDefault();
			var formdata= $("#formsanpham").serializeArray();
			json = {};
			arraychitiet=[];
			
			$.each(formdata,function(i,field){
				json[field.name]=field.value;
			});
		
			$("#contenchitiet > .chitiet-sanpham").each(function(){
				objectchitiet={};
				var mamau= $(this).find("#mamau").val();
				var masize= $(this).find("#masize").val();
				var soluong= $(this).find("#soluong").val();
				objectchitiet["mamau"]= mamau;
				objectchitiet["masize"]=masize;
				objectchitiet["soluong"]=soluong;
				
				arraychitiet.push(objectchitiet);
			});
			json["masanpham"]=masanpham;
			json["hinhanh"]=hinhanh;
			json["chitietsanpham"]=arraychitiet;
			
			console.log(json);
			$.ajax({
				url:"/minishop/api/capnhatsanpham",
				type:"POST",
				data:{
					dataJson:JSON.stringify(json)
				},
				success: function(value){

				}
				})

		});

	})	