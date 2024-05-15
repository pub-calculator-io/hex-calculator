function calculate(){
  const toHex = dec => math.hex(dec).replace('0x','').toUpperCase();
  const inputHex = (elementId, optional) => {
    let value = input.get(elementId).raw();
    if(optional && !value) return '';
    if(!/^[0-9a-fA-F]+$/.test(value)) {
      input.error(elementId, `${elementId} must be a natural hex number.`);
    }
    return value;
  };
  switch($('[data-tab].tab--active').dataset.tab){
    case '0': 
      // 1. init & validate
      const hex = inputHex('hex', true).toUpperCase();
      const dec = input.get('dec').optional().natural().raw();
      input.silent = false;
      if(!hex && !dec){
        input.error('hex');
        input.error('dec');
      }
      if(!input.valid()) return;

      // 2. calculate
      const hexToDec = hex ? `${hex} = ${math.number('0x'+hex)}` : '';
      const decToHex = dec ? `${dec} = ${toHex(dec)}` : '';
      
      // 3. output
      _('hex_to_dec').innerHTML = hexToDec; 
      _('dec_to_hex').innerHTML = decToHex; 
    break;
    case '1': 
      // 1. init & validate
      const hexA = inputHex('hex_a').toUpperCase(), decA = math.number('0x'+hexA);
      const hexB = inputHex('hex_b').toUpperCase(), decB = math.number('0x'+hexB);
      const operation = input.get('math_operation').raw();
      if(hexB == 0 && operation == 'divide') input.error('hex_b', 'Division by zero in hex_b');
      if(!input.valid()) return;
      const operationsMap = {'add':'+','subtract':'−','multiply':'×','divide':'÷'};

      // 2. calculate
      let hexResult = `${hexA} ${operationsMap[operation]} ${hexB} = ${toHex(math[operation](decA,decB))}`;
      let decResult = `${decA} ${operationsMap[operation]} ${decB} = ${math[operation](decA,decB)}`;
      if(operation == 'divide' && math.mod(decA,decB) != 0) {
        hexResult+= ` or ${toHex(math.divide(decA-math.mod(decA,decB),decB))} remainder ${toHex(math.mod(decA,decB))}`;
        decResult+= ` or ${math.divide(decA-math.mod(decA,decB),decB)} remainder ${math.mod(decA,decB)}`;
      }
      // 3. output
      _('hex_result').innerHTML = hexResult;
      _('dec_result').innerHTML = decResult;
    break;
  }
}
