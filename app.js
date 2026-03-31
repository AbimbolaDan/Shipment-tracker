const track_btn = document.getElementById('track-btn');
const track_form = document.getElementById('track-form');
const input= document.getElementById('Number');
const tracking_result = document.getElementById('tracking-results')


track_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputvalue = input.value;
    if(inputvalue === "") {
        alert('Please input a Shipment ID');
        return
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
        time_delivered: '5:00PM',
        remarks: 'Waiting for arrival at final destination.',
        done: true
    }
]    

// const currentStatus = details[details.length - 1];
const estDelivery = "28th April 2026";
const currentStatusItem = details.filter(item => item.done).pop() || details[0];
// Inside your timelineHTML map function
const timelineHTML = details.map((item) => {
    let statusColorClass = '';
    const statusLower = item.status.toLowerCase();

    if (statusLower.includes('out for delivery')) {
        statusColorClass = 'dot-red';
    } else if (statusLower.includes('in transit')) {
        statusColorClass = 'dot-yellow';
    } else if (statusLower.includes('delivered')) {
        statusColorClass = 'dot-green';
    }

    return `
        <div class="timeline-item ${item.done ? 'done' : 'pending'}">
            <div class="timeline-dot ${statusColorClass}"></div>
            <div class="timeline-content">
                <h4>${item.status}</h4>
                <p class="timeline-meta">${item.location} ${item.time !== 'pending' ? '— ' + item.time : ''}</p>
                <p class="timeline-remark">"${item.remarks}"</p>
            </div>
        </div>
    `;
}).join('');

   let currentColor = 'var(--primary-blue)'; // Default
if (currentStatusItem.status.toLowerCase().includes('out for delivery')) currentColor = 'var(--primary-red)';
if (currentStatusItem.status.toLowerCase().includes('in transit')) currentColor = 'var(--primary-yellow)';
if (currentStatusItem.status.toLowerCase().includes('delivered')) currentColor = 'var(--primary-green)';
// const currentData = details[details.length - 1]; 

const cardElement = `
     <div class="trackingcard">
        <h2 style="color: var(--text-dark); margin-bottom: 20px;">Shipment Status</h2>
        <div class="result-box">
            <div class="timeline-container" style="flex: 2;">
                ${timelineHTML}
            </div>
            
            <div class="status_container">
                <h3 style="border-bottom: 2px solid var(--primary-yellow); padding-bottom: 8px; margin-bottom: 15px;">Current Status</h3>

                <p style="font-size: 0.8rem; color: var(--text-muted);">Status:</p>
                <h4 style="color: ${currentColor}; margin-bottom: 15px; font-size: 1.3rem;">
                    ${currentStatusItem.status}
                </h4>

                <p style="font-size: 0.8rem; color: var(--text-muted);">Current Location:</p>
                <p style="font-weight: 600; margin-bottom: 15px;">${currentStatusItem.location}</p>

                <div style="background: white; padding: 12px; border-radius: 8px; border-left: 4px solid var(--primary-yellow);">
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Remarks:</p>
                    <p style="font-size: 0.85rem; font-style: italic;">${currentStatusItem.remarks}</p>
                </div>

                <div style="margin-top: 20px;">
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Estimated Delivery:</p>
                    <p style="font-weight: bold; color: var(--primary-blue); font-size: 1.1rem;">April 28, 2026</p>
                </div>
            </div>
        </div>
     </div>
`;
    tracking_result.innerHTML = cardElement;
    tracking_result.classList.remove('hidden');
    tracking_result.classList.add('reveal');
})  