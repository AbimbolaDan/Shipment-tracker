const track_btn = document.getElementById('track-btn');
const track_form = document.getElementById('track-form');
const input= document.getElementById('Number');
const tracking_result = document.getElementById('tracking-results')


track_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputvalue = input.value;
    if(inputvalue === "") {
        alert('input Shipment ID')
    }
    
    
    const details = [
        {
    status :'Shipment created',
    location: 'lagos',
    Date : '24th April 2026',
    time: '11:00AM',
    remarks: 'Tracking ID Generated, Shipment details received',
    done : true
    },
    {
        status : 'Depature Origin ',
        location: 'Lagos',
        Date: '6th April 2026',
        time : '11:00AM',
        remarks: 'Arrived at sorting facility for processing',
        done: true
    },
    {
        status: 'Out for delivery',
        location : 'Lagos',
        Date : '7th April 2026',
        time: '10:00AM',
        remarks: 'Shipment is out for delivery',
        done : true
    },
    {
        status: 'In Transit',
        location : 'En-route to Destination',
        Date: '7th April 2026',
        time: '1:00PM',
        remarks: 'Shipment is currently moving between hubs.',
        done: true
    },
    {
        status: 'Delivered',
        location: 'Kwara',
        Date: 'pending',
        time: 'pending',
        remarks: 'Waiting for arrival at final destination.',
        done: true
    }
]

    
   // Replace your existing cardElement variable with this:
const timelineHTML = details.map((item) => `
        <div class="timeline-item ${item.done ? '' : 'pending'}">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${item.status}</h4>
                <p class="timeline-meta">${item.location} ${item.time !== 'Pending' ? '— ' + item.time : ''}</p>
                <p class="timeline-remark">"${item.remarks}"</p>
            </div>
        </div>
    `).join('');

    const cardElement = `
         <div class="trackingcard">
            <h2 style="color: var(--text-dark); margin-bottom: 20px;">Shipment Status</h2>
            <div class="timeline-container">
                ${timelineHTML}
            </div>
         </div>
    `;
    tracking_result.innerHTML = cardElement;
    tracking_result.classList.remove('hidden');
    tracking_result.classList.add('reveal');
})  