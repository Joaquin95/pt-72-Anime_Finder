#do the api for anime database first, then do it for manga and others etc

import requests

url = 'https://api.myanimelist.net/v2'  # Replace with the actual API URL

# Step 2: Send the GET request (or POST, PUT, DELETE depending on your needs)
response = requests.get(url)

# Step 3: Check the response status code
if response.status_code == 200:
    # Step 4: Parse the JSON response (if it's JSON data)
    data = response.json()
    print("API Response:", data)
else:
    print(f"Error: Unable to fetch data. Status code: {response.status_code}")

