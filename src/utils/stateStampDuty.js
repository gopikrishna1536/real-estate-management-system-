/**
 * Multi-State Property Registration & Stamp Duty Calculator
 */
export class StateStampDuty {
  static STATE_RATES = {
    maharashtra: { stampPercent: 5.0, regPercent: 1.0, femaleConcession: 1.0 },
    karnataka: { stampPercent: 5.0, regPercent: 2.0, femaleConcession: 0.0 },
    tamil_nadu: { stampPercent: 7.0, regPercent: 2.0, femaleConcession: 0.0 },
    telangana: { stampPercent: 6.0, regPercent: 1.5, femaleConcession: 0.0 },
    delhi: { stampPercent: 6.0, regPercent: 1.0, femaleConcession: 2.0 }
  };

  static calculateDuty(propertyValue, stateName, isFemaleBuyer = false) {
    const stateKey = stateName.toLowerCase().replace(/\s+/g, '_');
    const rates = StateStampDuty.STATE_RATES[stateKey];
    if (!rates) {
      throw new Error(`Unsupported state: ${stateName}`);
    }

    let stampRate = rates.stampPercent;
    if (isFemaleBuyer) stampRate -= rates.femaleConcession;

    const stampDuty = Number((propertyValue * (stampRate / 100)).toFixed(2));
    const registrationFee = Number((propertyValue * (rates.regPercent / 100)).toFixed(2));
    const totalGovernmentCharges = Number((stampDuty + registrationFee).toFixed(2));

    return {
      propertyValue,
      state: stateName,
      stampDutyRatePercent: stampRate,
      stampDutyAmount: stampDuty,
      registrationFeeRatePercent: rates.regPercent,
      registrationFeeAmount: registrationFee,
      totalGovernmentCharges
    };
  }
}
