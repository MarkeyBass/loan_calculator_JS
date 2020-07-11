document.querySelector("#loan-form").addEventListener('submit', function(e) {
  document.getElementById('results').style.display = "none";
  document.getElementById('loading').style.display = "block";
  
  const display = () => {
    setTimeout(() => {
      document.getElementById('results').style.display = "block";
      document.getElementById('loading').style.display = "none";
      calculateResults();
    }, 1000)
  }
  
  display();
  
  e.preventDefault();
});

function calculateResults() {
  
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) *12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);    
  } else {
    document.getElementById('results').style.display = "none"
    document.getElementById('loading').style.display = "none";
    showError('Pleas check yore numbers');
  }  
}

const showError = (error) => {
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
  function clearError () {
    errorDiv.remove();
  }
}

