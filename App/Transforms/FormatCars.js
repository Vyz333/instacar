import _ from 'lodash'
export default (cars)=>{
  let cars_arrays = []
  let cars_cats = {}
  for(let car of cars.reverse()){
    let trans = car.automatic==1?'automático':'estandar'
    let vehicle = {
      title:car.title.rendered,
      subtitle:car.n_doors+' puertas, '+trans,
      transmission: trans,
      rate:car.hourly_rate,
      illustration: car.car_picture.guid,
      id:car.id,
    }

    let cat = car.vehicle_type?car.vehicle_type[0].name:null
    
    if(cat){
      if(_.has(cars_cats, cat)){
        cars_cats[cat].push(vehicle)
      }else{
        cars_cats[cat] = [vehicle]
      }
    }
  }
  return JSON.parse(JSON.stringify(cars_cats))
}