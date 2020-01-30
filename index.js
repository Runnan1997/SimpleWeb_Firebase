
var state = "Home";
const auth = firebase.auth();

function signup(){
    state = "Signed up";
    var useremail = document.getElementById("email_field").value;
    var userpsw = document.getElementById("passward_field").value;

    const promise=auth.createUserWithEmailAndPassword(useremail, userpsw).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === "auth/email-already-in-use"){
            alert('The email is already used');
        }
        else if(errorCode === "auth/invalid-email"){
            alert('The emial address is not valid');
        }
        else{
            alert('The passwaord is too weak');
        }
    })
}


function login(){
    state = "Logged in";
    var useremail = document.getElementById("email_field").value;
    var userpsw = document.getElementById("passward_field").value;
    firebase.auth().signInWithEmailAndPassword(useremail, userpsw).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === "auth/invalid-email"){
            alert('The email address is invalid');
            state = "Home";
        }
        else if(errorCode === "auth/user-not-found"){
            alert('The user is not found');
            state = "Home";
        }
        else{
            alert('The password is not correct');
            state ="Home";
        }
        alert(state);
    }); 
}

function logout(){
    state ="Logged out";
    firebase.auth().signOut();
}


firebase.auth().onAuthStateChanged(function(user) {
    if (state === "Home") {

      document.getElementById("user-div").style.display = "none";
      document.getElementById("login-div").style.display = "block";
      document.getElementById("s-div").style.display = "none";
  
    } 
    else if(state === "Signed up") {
      // No user is signed in.
      document.getElementById("user-div").style.display = "none";
      document.getElementById("login-div").style.display = "block";
      alert("Sign up successfully!");
  
    }
    else if(state === "Logged in"){
        document.getElementById("user-div").style.display = "block";
        document.getElementById("login-div").style.display = "none";
        document.getElementById("s-div").style.display = "none";
    }
    else{
        document.getElementById("user-div").style.display = "none";
        document.getElementById("login-div").style.display = "block";
        document.getElementById("s-div").style.display = "none";
        state = "Home";
    }
  });