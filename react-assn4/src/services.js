
import axios from 'axios';

// const Event = function(data) {
//   this.name = data.name;
//   this.description = data.description;
//   this.startdate = data.startdate;
//   this.enddate = data.enddate;
// }

export function getAllEvents() {
  return axios.get('http://localhost:3000/events');
}

export function getEvent(id) {
  return axios.get('http://localhost:3000/events/:id');
}

export function getEventByName(name) {
  return axios.get('http://localhost:3000/events/by-name/:name');
}

export async function createEvent(event) {
  const res = await axios.post('http://localhost:3000/events', {
    name: event.name,
    description: event.description,
    startdate: event.startdate,
    enddate: event.enddate,
  })

  if (res.data.id) {
    return res;
  } else {
    throw new Error("it didn't return the id.");
  }
}

export function updateEvent(id) {
  return axios.put(`http://localhost:3000/events/${id}`);
}

export function deleteEvent(id) {
  return axios.delete(`http://localhost:3000/events/${id}`);
}

export function deleteAllEvents() {
  return axios.delete('http://localhost:3000/events');
}