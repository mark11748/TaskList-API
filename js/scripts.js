var taskList = [];
var defaultDate  = new Date();
var defaultYear  = defaultDate.toString().split(' ')[3];
var defaultMonth = defaultDate.getMonth();
var defaultDay   = defaultDate.toString().split(' ')[2];

$(document).ready(function(){

  var validText = function (arg) {
    return ((typeof arg === "string")&&((arg.trim()).length>0));
  };
  var flashErrors = function() {
    if ( $("#ERROR-MSG").children().length > 0) {
      $("#ERROR-MSG").fadeIn(2000);
      setTimeout(function() {
        $("#ERROR-MSG>*").fadeOut(1000);
        $("#ERROR-MSG").fadeOut(1500);
        $("#ERROR-MSG").empty();
      }, 4000);
    }
  };

  Task = function(newName,newDate) {
    this.name=newName;
    this.deadline=newDate;

    taskList.push(this);
    this.index=(taskList.length-1);
  };

  Task.prototype.removeTask = function () {
    taskList.pop(this.index);
  };
  Task.prototype.editTask = function (newName,newDate) {
    this.name=newName;
    this.deadline=newDate;
  };

  //LIST
  var listTasks = function(){
    $("#LIST").empty();
    taskList.forEach(function(i,e){
      i.index = e;
      $("#LIST").append("<p>" + i.index + " : " + i.name + " -- (" + i.deadline + ")</p>");
    });
  };

  $("#LEFT-DISPLAY>div,#ERROR-MSG").hide();
  $("#OPTIONS").show();
  //ADD
  $("button[name='addButton']").click(function(){
    $("input[name='new-deadLine']").val(defaultYear+"-"+(defaultMonth+1).toString()+"-"+defaultDay);
    $("#INPUT-newTask").toggle();
    $("#OPTIONS").toggle();
  });

  $("#INPUT-newTask>form").submit(function(event){
    event.preventDefault();
    var name = $("input[name='new-name']").val();
    var deadLine = $("input[name='new-deadLine']").val();

    if ( (validText(name)) && (validText(deadLine)) ) {
      new Task(name,deadLine);
    }
    else if( !(validText(name)) ){ $("#ERROR-MSG").append("<p>Error: *NAME* field was either left empty or invalid</p>"); }
    else if( !(validText(deadLine)) ) { $("#ERROR-MSG").append("<p>Error: *DEADLINE* field was either left empty or invalid</p>"); }

    flashErrors();
    listTasks();
  });

  //EDIT
  $("button[name=editButton]").click(function(){
    $("input[name='edit-index']").val("0");
    $("input[name='edit-deadLine']").val(defaultYear+"-"+(defaultMonth+1).toString()+"-"+defaultDay);
    $("#INPUT-editTask").toggle();
    $("#OPTIONS").toggle();
  });

  $("#INPUT-editTask>form").submit(function(event){
    event.preventDefault();
    var index    = parseInt( $("input[name='edit-index']").val() );
    var name     = $("input[name='edit-name']").val();
    var deadLine = $("input[name='edit-deadLine']").val();

    console.log(deadLine+" : "+typeof deadLine);

    if ( !isNaN(index) ) {
      if ( (index < 0) || (index >= taskList.length) ) { $("#ERROR-MSG").append("<p>Error: Selected index is out of bounds.</p>"); }
      else {
        if ( validText(name) ) { taskList[index].name = name; }
        else { $("#ERROR-MSG").append("<p>Error: *NAME* field was either left empty or invalid</p>"); }

        if ( validText(deadLine) ) { taskList[index].deadline = deadLine; }
        else { $("#ERROR-MSG").append("<p>Error: *DEADLINE* field was either left empty or invalid</p>"); }
      }
    }
    else {
      $("#ERROR-MSG").append("<p>Error: Invalid index given. Must be a number.</p>");
    }

    flashErrors();
    listTasks();

  });
  //DELETE
  $("button[name=removeButton]").click(function(){
    $("input[name='delete-index']").val("0");
    $("#INPUT-removeTask").toggle();
    $("#OPTIONS").toggle();
  });
  $("#INPUT-removeTask>form").submit(function(event){
    event.preventDefault();
    var index = parseInt( $("input[name='delete-index']").val() );
    if ( (typeof index!="number") ) { $("#ERROR-MSG").append("<p>Error: Invalid index given. Must be a number.</p>"); }
    else if ( (index < 0) && (index >= taskList.length) ) { $("#ERROR-MSG").append("<p>Error: Selected index is out of bounds.</p>"); }
    else { taskList.splice(index,1); }

    console.log("index selected for removal: "+index);
    console.log( $("#ERROR-MSG").children() );
    console.log( taskList );


    flashErrors();
    listTasks();
  });
  //CANCEL FORM
  $(".cancel").click(function(event){
    event.preventDefault();
    $("#INPUT-newTask, #INPUT-editTask, #INPUT-removeTask").hide();
    $("#INPUT-newTask>input, #INPUT-editTask>input, #INPUT-removeTask>input").val("");
    $("div#OPTIONS").show();
  });
});
