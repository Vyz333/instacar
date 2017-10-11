import _ from 'lodash'
export default (order,model,auth,groupTimeStamp)=>{
  let wp_order = {
    title: order.email+'_'+Math.floor(Date.now() / 1000),
    email: order.email,
    vehicle: model.id,
    group:order.email+'_'+groupTimeStamp,
    //Delivery Itinerary
    addr_delivery: order.delivery_address.address,
    latitude_delivery:order.delivery_address.latitude,
    longitude_delivery:order.delivery_address.longitude,
    datetime_delivery: order.delivery_datetime,
    //Return Itinerary
    addr_return: order.return_address.address,
    latitude_return:order.return_address.latitude,
    longitude_return:order.return_address.longitude,
    datetime_return: order.return_datetime,
    current_status: '1',
    car_model: model.title,
    driver: order.driver.value,
    trip_type:order.trip_type,
    current_status:0,

    token:auth.token,
    status:'publish',
  }
  return wp_order
}