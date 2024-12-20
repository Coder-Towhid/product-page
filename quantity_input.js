function increaseValue() {
    const input = document.getElementById('quantity');
    const max = input.max ? parseInt(input.max) : Infinity;
    if (parseInt(input.value) < max) {
      input.value = parseInt(input.value) + parseInt(input.step || 1);
    }
  }
  
  function decreaseValue() {
    const input = document.getElementById('quantity');
    const min = input.min ? parseInt(input.min) : -Infinity;
    if (parseInt(input.value) > min) {
      input.value = parseInt(input.value) - parseInt(input.step || 1);
    }
  }
  