from geopy.geocoders import Nominatim
import time

cities = [
"Ahmedabad","Chennai","Ludhiana","Pune","Delhi","Mumbai","Surat",
"Visakhapatnam","Bangalore","Kolkata","Ghaziabad","Hyderabad","Jaipur",
"Lucknow","Bhopal","Patna","Kanpur","Varanasi","Nagpur","Meerut","Thane",
"Indore","Rajkot","Vasai","Agra","Kalyan","Nashik","Srinagar","Faridabad",
"Vadodara","Ranchi","Madurai","Aurangabad","Dhanbad","Amritsar",
"Allahabad","Gwalior","Jabalpur","Jodhpur","Raipur","Kota","Chandigarh",
"Thiruvananthapuram","Solapur","Hubli","Bareilly","Moradabad","Mysore",
"Aligarh","Jalandhar","Tiruchirappalli","Salem","Warangal","Guntur",
"Bhiwandi","Saharanpur","Gorakhpur","Bikaner","Amravati","Jamshedpur",
"Bhilai","Cuttack","Firozabad","Bhavnagar","Durgapur","Asansol",
"Rourkela","Nanded","Kolhapur","Ajmer","Akola","Gulbarga","Jamnagar",
"Ujjain","Siliguri","Jhansi","Nellore","Jammu","Belgaum","Mangalore",
"Tirunelveli","Malegaon","Gaya","Jalgaon","Udaipur","Davanagere",
"Kozhikode","Kurnool","Rajahmundry","Bokaro","Bellary","Patiala",
"Agartala","Bhagalpur","Muzaffarnagar","Latur","Dhule","Sagar","Korba",
"Bhilwara","Berhampur","Muzaffarpur","Ahmednagar","Mathura","Kollam",
"Kadapa","Sambalpur","Bilaspur","Shahjahanpur","Satara","Bijapur",
"Rampur","Shivamogga","Chandrapur","Junagadh","Thrissur","Alwar",
"Bardhaman","Kakinada","Nizamabad","Parbhani","Durg","Raigarh",
"Ambikapur","Jagdalpur","Rajnandgaon","Dhamtari","Kanker","Palghar",
"Udupi","Kochi","Rohtak","Shimla","Bhubaneswar","Coimbatore","Dehradun",
"Guwahati","Bharatpur","Sikar","Pali","Churu","Barmer"
]

geolocator = Nominatim(user_agent="city_coords")

coords = {}

for city in cities:
    location = geolocator.geocode(city + ", India")
    if location:
        coords[city] = [location.latitude, location.longitude]
    else:
        coords[city] = None
    time.sleep(1)

print("var cityCoords = {")
for city, coord in coords.items():
    if coord:
        print(f'"{city}":[{coord[0]:.4f},{coord[1]:.4f}],')
print("}")