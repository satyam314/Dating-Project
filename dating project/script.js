function searchForMatch() {
            // Get user-provided data
            const formData = {
                rollNumber: document.getElementById('roll-number').value,
                name: document.getElementById('name').value,
                yearOfStudy: parseInt(document.getElementById('year-of-study').value),
                age: parseInt(document.getElementById('age').value),
                gender: document.querySelector('input[name="gender"]:checked').value,
                interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(input => input.value),
                hobbies: Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(input => input.value),
                email: document.getElementById('email').value,
                // Add more fields as needed
            };

            // Fetch JSON data and search for matches
            fetch('/students.json')
                .then(response => response.json())
                .then(data => {
                    const matches = students.filter(person => {
                        // Implement your search criteria here
                        // For example, search for matches based on interests and age
                        return Math.abs(person.age - formData.age) <= 3 &&
                               person.interests.filter(interest => formData.interests.includes(interest)).length >= 2 &&
                               person.hobbies.some(hobby => formData.hobbies.includes(hobby));
                    });

                    displayMatches(matches);
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        function displayMatches(matches) {
            const matchResults = document.getElementById('match-results');
            matchResults.innerHTML = '';

            if (matches.length === 0) {
                matchResults.textContent = 'No matches found.';
            } else {
                const ul = document.createElement('ul');
                matches.forEach(match => {
                    const li = document.createElement('li');
                    li.textContent = `${match.name}, Age: ${match.age}`;
                    ul.appendChild(li);
                });
                matchResults.appendChild(ul);
            }
        }
