import React from "react";

const StrengthChecker = ({password,isUppercase,isLowercase,isNumber,issymbols}) => {
  const getPasswordStrength = () => {
    const passwordLength = password.length;

    if(isUppercase && isLowercase && isNumber && issymbols && passwordLength>=10){
        return "Very Strong";
    }
    else if(isUppercase && isLowercase && (isNumber || issymbols) && passwordLength>=8){
        return "Strong";
    }
    else if((isUppercase || isLowercase) && (isNumber || issymbols) && passwordLength>=6){
        return "Medium";
    }
    else if(passwordLength<1){
        return "";
    }
    else{
        return "Weak";
    }
  }

  const passwordStrength = getPasswordStrength();
  if (!passwordStrength) return <React.Fragment/>
  return(
    <span className="pl-2">{passwordStrength}</span>
  )
};

export default StrengthChecker;
