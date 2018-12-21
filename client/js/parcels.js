const output = document.getElementById('output');
const url = 'http://localhost:3100/api/v1';

const getOrders = async () => {
  const token = localStorage.getItem('token');

  const res = await fetch(`${url}/parcels`, {
    method: 'GET',
    headers: {
      'x-access-token': token,
    },
  });

  const jsonRes = await res.json();

  try {
    if (res.ok) {
      const display = jsonRes.data;

      let displayToAdmin = '<h2>Orders</h2>';

      display.forEach((parcel) => {
        displayToAdmin += `
        <ul>
        <li>ID: ${parcel.id}</li>
        <li>Customer ID: ${parcel.userid}</li>
        <li>Receiver: ${parcel.receiver}</li>
        <li>Item: ${parcel.item}</li>
        <li>Schedule: ${parcel.schedule}</li>
        <li>Present Location: ${parcel.present_location}</li>
        <li>Status: ${parcel.order_status}</li>
        </ul>
        `;
      });
      output.innerHTML = displayToAdmin;

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

window.addEventListener('load', getOrders);
