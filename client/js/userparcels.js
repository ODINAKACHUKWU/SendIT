const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const getUserParcels = async () => {
  const token = localStorage.getItem('token');
  const decoded = jwt_decode(token);

  const res = await fetch(`${url}/users/${decoded.userId}/parcels`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;

      if (typeof (display) === 'undefined') {
        output.innerHTML = 'You have not created any parcel delivery order.';
        return;
      }

      let displayToUser = '<h2>Parcel Orders Created</h2>';

      display.forEach((parcel) => {
        displayToUser += `
        <ul>
        <li>ID: ${parcel.id}</li>
        <li>Receiver: ${parcel.receiver}</li>
        <li>Item: ${parcel.item}</li>
        <li>Schedule: ${parcel.schedule}</li>
        <li>Present Location: ${parcel.present_location}</li>
        <li>Status: ${parcel.order_status}</li>
        </ul>
        `;
      });
      output.innerHTML = displayToUser;

      //   const display = () => {
      //     // console.log(response);
      //     // result.innerHTML = response;
      //     // result.style.fontFamily = 'arial';
      //     let output = '<h2>Parcels</h2>';
      //     response.forEach((parcel) => {
      //       // output += `
      //       //     <ul>
      //       //         <li>UserID: ${post.userId}</li>
      //       //         <li>ID: ${post.id}</li>
      //       //         <li>Title: ${post.title}</li>
      //       //         <li>Post: ${post.body}</li>
      //       //     </ul>
      //       // `;
      //       output += `
      //                     <div>
      //                         <h3>${parcel.title}</h3>
      //                         <p>${parcel.body}</p>
      //                     </div>
      //                 `;
      //     });
      //     result.innerHTML = output;
      //     result.style.fontFamily = 'arial';
      //   };

    //   display();
    }
  } catch (error) {
    console.log(`There is an error: ${error.message}`);
  }
};

window.addEventListener('load', getUserParcels);
