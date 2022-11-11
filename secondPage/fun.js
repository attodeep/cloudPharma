document.getElementById("Billing").onclick = function mnologin() {

    var mno = document.getElementById("mno").value;

    console.log("Hello: ",mno);
    return mno; 

    
}

document.getElementById("signUp").onclick = function redsignUp() {
    window.open("/secondPage3/html/singupIndex.html");
}

document.getElementById("signupbutton").onclick = function mysignup() {

    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var mno = document.getElementById("mno").value;
    var city = document.getElementById("city").value;
    var zcode = document.getElementById("zcode").value;
    var gender = document.getElementById("gender").value;

    console.log("Hello: ",fname);
    console.log("Hello: ",lname);
    console.log("Hello: ",mno);
    console.log("Hello: ",city);
    console.log("Hello: ",zcode);
    console.log("Hello: ",gender);
    // return mno; 

    
}



// module.exports = {mnologin};