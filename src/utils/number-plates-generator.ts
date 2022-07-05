const generateNumberPlate = () => {
    const r = (x:number) => ~~(Math.random() * x) + "";
    const l = (x:number) => [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"][r(26)];
  
    return r(10) + r(10) + r(10) + "-" + l() + l() + l();
  };
  
  export default generateNumberPlate;
  