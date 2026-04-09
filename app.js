const track_btn = document.getElementById('track-btn');
const track_form = document.getElementById('track-form');
const input= document.getElementById('Number');
const tracking_result = document.getElementById('tracking-results')

input.addEventListener('input', () => {
    if(input.value.trim() === "") {
        tracking_result.classList.add('hidden');
    }
})
track_form.addEventListener('submit', (e) => {

    const mapHero = document.getElementById('map-hero');

    e.preventDefault();
    const inputvalue = input.value.trim();

    if(inputvalue === "") {
        alert('Please input a Shipment ID');
        tracking_result.innerHTML = "";          
        tracking_result.classList.add('hidden'); 
        tracking_result.classList.remove('reveal');
        mapHero.classList.add('hidden')
        return;
    }
    

    tracking_result.classList.remove('hidden');
    tracking_result.classList.add('reveal');
    mapHero.classList.remove('hidden');
    
    
    const details = [
        {
    status :'Shipment Created',
    location: 'Guangzhou, China',
    Date : '24th April 2026',
    time: '11:00AM',
    remarks: 'Tracking ID Generated, Shipment details received',
    done : true
    },
    {
        status : 'Depature Origin ',
        location: 'Guangzhou, China',
        Date: '6th April 2026',
        time : '11:00AM',
        remarks: 'Arrived at sorting facility for processing',
        done: true
    },
    {
        status: 'Out for Delivery',
        location : 'Guangzhou, China',
        Date : '7th April 2026',
        time: '10:00AM',
        remarks: 'Shipment is out for delivery',
        done : true
    },
    {
        status: 'In Transit',
        location : 'Lagos ,Nigeria',
        Date: '7th April 2026',
        time: '1:00PM',
        remarks: 'Shipment is currently moving between hubs.',
        done: true
    },
    {
        status: 'Delivered',
        location: 'Lagos , Nigeria',
        Date: '28th April 2026',
        time: '5:00PM',
        time_delivered: '5:00PM',
        remarks: 'Waiting for arrival at final destination.',
        done: false
    }
]    

const estDelivery = "28th April 2026";
const currentStatusItem = details.filter(item => item.done).pop() || details[0];
const originHub = details[0].location; 
const currentHub = currentStatusItem.location;
initGlobalMap(originHub, currentHub);
// initGlobalMap(currentStatusItem.location);

async function initGlobalMap(originName, destinationName) {
    try {
        // 1. Search for BOTH locations at the same time
        const [originRes, destRes] = await Promise.all([
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(originName)}`),
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationName)}`)
        ]);

        const originData = await originRes.json();
        const destData = await destRes.json();

        if (originData.length === 0 || destData.length === 0) return;

        const originCoords = [originData[0].lat, originData[0].lon];
        const destCoords = [destData[0].lat, destData[0].lon];

        // 2. Reset the map container to prevent "Map already initialized" errors
        const container = L.DomUtil.get('map-hero');
        if (container != null) { container._leaflet_id = null; }

        // 3. Create the map
        const map = L.map('map-hero').setView(destCoords, 3);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // 4. ADD MARKER 1: The Origin
        L.marker(originCoords).addTo(map)
            .bindPopup(`<b>Origin:</b> ${originName}`);

        // 5. ADD MARKER 2: The Current Location
        L.marker(destCoords).addTo(map)
            .bindPopup(`<b>Current:</b> ${destinationName}`)
            .openPopup();

        // 6. Draw the Red Line (Polyline) between them
        const pathPoints = [originCoords, destCoords];
        const polyline = L.polyline(pathPoints, {
            color: 'var(--primary-red)',
            weight: 3,
            dashArray: '10, 10', // Makes it a dashed "flight" line
            opacity: 0.8
        }).addTo(map);

        // 7. Auto-zoom the map so BOTH markers are visible on screen
        map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    } catch (error) {
        console.error("Mapping error:", error);
    }
}
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
        <h2 style="color: var(--text-dark); margin-bottom: 20px; font-weight: 800"><span class = 'GS'> GSIL </span> Shipment Timeline</h2>
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
         <footer class="foot">
        &copy;Designed by Webixon
    </footer>
     </div>
`;
    tracking_result.innerHTML = cardElement;
    tracking_result.classList.remove('hidden');
    tracking_result.classList.add('reveal');
})  