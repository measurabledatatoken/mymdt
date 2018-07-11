function maskPhoneNumber(phoneNumber) {
  const firstSliceEndIndex = phoneNumber.length / 3;
  const secondSliceEndIndex = 2 * (phoneNumber.length / 3);

  let maskedPhoneNumber = phoneNumber.slice(0, firstSliceEndIndex);
  for (let i = firstSliceEndIndex; i < secondSliceEndIndex; i += 1) {
    maskedPhoneNumber = maskedPhoneNumber.concat('*');
  }
  maskedPhoneNumber = maskedPhoneNumber.concat(
    phoneNumber.slice(secondSliceEndIndex, phoneNumber.length),
  );
  return maskedPhoneNumber;
}

// included country code. Assmued Country Code is seperate from Phone using a space
function maskFullPhoneNumber(fullPhoneNum) {
  const phoneNumberArray = fullPhoneNum.split(' ');
  let phoneNumber = '';
  let countryCode = '';
  // remove country code
  if (phoneNumberArray.length > 1) {
    countryCode = phoneNumberArray[0];
    phoneNumber = phoneNumberArray[1];
    return `${countryCode} ${maskPhoneNumber(phoneNumber)}`;
  }

  phoneNumber = fullPhoneNum;
  return maskPhoneNumber(phoneNumber);
}

export { maskPhoneNumber, maskFullPhoneNumber };
