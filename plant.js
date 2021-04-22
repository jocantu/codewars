function plant(seed, water, fert, temp){
  let str = '';
  if (temp > 19 && temp < 31) {
    for (let i=1;i<=water;i++){
      str = str + "-".repeat(water)+seed.repeat(fert);
    }
    console.log(str);
  } else {
    let repeat_num = water+fert*water;
    str="-".repeat(water*water)+seed;
    console.log(str);
  }
  return str;
}
