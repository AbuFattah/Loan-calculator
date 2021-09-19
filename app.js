// selecting from dom
const form = document.querySelector('#loan-form');

//adding event listeners
form.addEventListener('submit', function(e){
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';
  setTimeout(calculateResults,2000);
  e.preventDefault();
});

// calculateResults function
function calculateResults(){
//UI variables
  const loanAmount = document.querySelector('#loan-amount');
  const annualInterest = document.querySelector('#annual-interest');
  const repaymentYears = document.querySelector('#repayment-years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  //calculations
  const principal = loanAmount.value;
  const rate = annualInterest.value/100/12;
  const numberOfPayments = repaymentYears.value * 12;

  const numerator = principal * rate;
  const denominator = 1 - (1+rate)**(-numberOfPayments);
  const monthly = numerator/denominator;
  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * numberOfPayments).toFixed(2);
    totalInterest.value = ((monthly * numberOfPayments) - (principal)).toFixed(2);
    document.querySelector('#results').style.display = 'block';
    //hide loader
    document.querySelector('#loading').style.display = 'none';
  }else{
    showError('Please provide the numbers..');
    document.querySelector('#loading').style.display = 'none';
/*     monthlyPayment.value = null;
    totalPayment.value = null;
    totalInterest.value = null; */
  }

}

function showError(error){
  //create div
  const errorDiv = document.createElement('div');
  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //add class
  errorDiv.className = 'alert alert-danger';
  //create text node append to div
  errorDiv.appendChild(document.createTextNode(error));
  if(card.firstElementChild.classList.contains('alert')){
    
  }else{
    card.insertBefore(errorDiv,heading);
  }
  

  setTimeout(clearError,4000);
}

function clearError(){
  document.querySelector('.alert').remove();
}
