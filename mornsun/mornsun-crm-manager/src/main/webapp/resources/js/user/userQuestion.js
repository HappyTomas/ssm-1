$(function() {
	
	//初始化grid
	InitGrid();
	
	//搜索数据
	BindSearchEvent();
	
	//编辑数据
	BindEditEvent();
	
	//添加数据
	BindAddEvent();
	
});

//初始化grid
function InitGrid(queryData) {
	$('#grid').datagrid({
		url:"user/question/pagination?sessionId="+sessionId,
		title: '用户问题列表',
		iconCls: 'icon-view',
//		height: 650,
		height:document.body.clientHeight * 0.9,
		width: function() {
			return document.body.clientWidth * 0.9
		},
		nowrap: true,
		autoRowHeight: false,
		striped: true,
		collapsible: true,
		pagination: true,
		singleSelect:true,
		pageSize: 18,
		pageList: [18, 50, 100],
		rownumbers: true,
		sortOrder: 'asc',
		remoteSort: false,
		idField: 'id',
		queryParams:queryData,
		columns: [
			[{
				field: 'ck',
				checkbox: true
			}, {
				title: '用户名称',
				field: 'userName',
				width: 120,
				sortable: true,
				formatter: function (value, rec, index) {  
					if (rec.userVo) {
						return rec.userVo.userName;
					}
                }
			},{
				title: '标题',
				field: 'title',
				width: 120,
				sortable: true
			}, {
				title: '回答用户',
				field: 'answerUserId',
				width: 120,
				sortable: true,
				formatter: function (value, rec, index) {  
					if (rec.answerUserVo) {
						return rec.answerUserVo.userName;
					}
                }
			}, {
				title: '阅读人数',
				field: 'readCount',
				width: 80,
				sortable: true
			}, {
				title: '回答人数',
				field: 'answerCount',
				width: 80,
				sortable: true
			}, {
				title: '是否有效',
				field: 'isavailable',
				align:"center",
				width: 80,
				sortable: true,
				formatter: function (value, rec, index) {  
                   if(value=="1"){
                	   return "有效"; 
                   }else{
                	   return "无效";
                   }
                }
			}, {
				title: '是否公开',
				field: 'isPublic',
				align:"center",
				width: 80,
				sortable: true,
				formatter: function (value, rec, index) {  
                   if(value=="1"){
                	   return "公开"; 
                   }else{
                	   return "不公开";
                   }
                }
			},{
				title: '创建时间',
				field: 'createTime',
				width: 120,
				sortable: true
			}, {
				title: '创建人',
				field: 'createBy',
				width: 120
			}, {
				title: '更新时间',
				field: 'updateTime',
				width: 120,
				sortable: true
			}, {
				title: '更新人',
				field: 'updateBy',
				width: 120
			},{
				title: '描述',
				field: 'descr',
				width: 120
			} ]
		],
		onLoadSuccess: function() {
			$(".appIconClass").linkbutton({
				plain: true,
				iconCls: $(this).attr("icon")
			});
		},
		toolbar: [
		{
			id: 'btnEdit',
			text: '修改',
			iconCls: 'icon-edit',
			handler: function() {
				ShowEditOrViewDialog();
			}
		}, '-',
		{
			id: 'btnView',
			text: '查看',
			iconCls: 'icon-table',
			handler: function() {
				ShowEditOrViewDialog("view");
			}
		}, '-',
		{
			id: 'btnReload',
			text: '刷新',
			iconCls: 'icon-reload',
			handler: function() {
				$("#grid").datagrid("reload")
			}
		}],
		onDblClickRow: function(rowIndex, rowData) {
			$('#grid').datagrid('uncheckAll');
			$('#grid').datagrid('checkRow', rowIndex);
			ShowEditOrViewDialog("view")
		}
	})
	
};

//搜索
function BindSearchEvent() {
	$("#ffSearch").form("clear");
	$("#btnSearch").click(function() {
		InitGrid($("#ffSearch").serializeJson());
		return false;
	})
};

//显示添加对话框
function ShowAddDialog() {
	$("#ffAdd").form("clear");
	$("#DivAdd").dialog('open').dialog('setTitle', '添加信息');
};

//添加数据
function BindAddEvent() {
	$("#btnAddOK").unbind("click").click(function() {
		var validate = $("#ffAdd").form('validate');
		if (validate == false) {
			return false;
		};
		var postData = $("#ffAdd").serializeArray();
		commPostRequest("user/question/save", postData, function(){
			//$.messager.alert("提示", "添加成功");
			$("#DivAdd").dialog("close");
			$("#grid").datagrid("reload");
			$("#ffAdd").form("clear");
		}, function(msg){
			$.messager.alert("提示", isEmpty(msg) ? "添加失败，请您检查" :msg);
		})
	})
};

//编辑/详情对话框
function ShowEditOrViewDialog(view) {
	var rows = $("#grid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择一条记录", "error");
		return;
	} else if (rows.length > 1) {
		$.messager.alert("提示", "每次只能修改/查看一条记录，你已经选择了<font color='red'  size='6'>" + rows.length + "</font>条", "error");
		return;
	};
	if (view == null) {
		clearForm("DivEdit");
		$("#DivEdit").dialog('open').dialog('setTitle', '修改信息');
		BindEditInfo();
	} else {
		$("#DivView").dialog('open').dialog('setTitle', '查看详细信息');
		BindViewInfo();
	}
};

//显示编辑数据
function BindEditInfo() {
	var data=$("#grid").datagrid("getSelections")[0];
	if(!data.payMoney){
		data.payMoney="0";
	}
	data.userName=data.userVo.userName;
	data.answerUserName=data.answerUserVo.userName;
	fillData($("#ffEdit"), data);
	$('#ffEdit').form('load', data);
};

//显示详情数据
function BindViewInfo() {
	var dataItem=$("#grid").datagrid("getSelections")[0];
	var data=jQuery.extend({}, dataItem);
	if(data.isavailable==1){
		data.isavailable="有效";
	}else{
		data.isavailable="无效";
	}
	if(data.isPublic==1){
		data.isPublic="公开";
	}else{
		data.isPublic="不公开";
	}
	data.userName=data.userVo.userName;
	data.answerUserName=data.answerUserVo.userName;
	fillData($("#ffView"), data);
};

//编辑数据
function BindEditEvent() {
	$("#btnEditOK").unbind("click").click(function() {
		var validate = $("#ffEdit").form("validate");
		if (validate == false) {
			return false;
		};
		var postData = $("#ffEdit").serializeArray();
		commPostRequest("user/question/update", postData, function(data) {
			//$.messager.alert("提示", "修改成功");
			$("#DivEdit").dialog('close');
			$("#grid").datagrid("reload");
		},function(msg){
			$.messager.alert("提示", isEmpty(msg) ? "修改失败，请您检查" : msg);
		})
	})
}