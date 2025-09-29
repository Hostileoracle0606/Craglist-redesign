// Search functionality and interactions
class CraigslistApp {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchSuggestions = document.getElementById('searchSuggestions');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.logo = document.getElementById('logo');
        
        this.init();
    }
    
    init() {
        this.setupSearch();
        this.setupCategories();
        this.setupFilters();
        this.setupNavigation();
    }
    
    setupSearch() {
        // Search input event listeners
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearchInput(e.target.value);
        });
        
        this.searchInput.addEventListener('focus', () => {
            this.showSuggestions();
        });
        
        this.searchInput.addEventListener('blur', () => {
            // Delay hiding to allow clicking on suggestions
            setTimeout(() => this.hideSuggestions(), 200);
        });
        
        this.searchBtn.addEventListener('click', () => {
            this.performSearch();
        });
        
        // Enter key search
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }
    
    setupCategories() {
        this.categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.navigateToCategory(category);
            });
        });
    }
    
    setupFilters() {
        // Filter toggle for mobile
        const filterToggle = document.querySelector('.filter-toggle');
        const filterPanel = document.querySelector('.filter-panel');
        
        if (filterToggle && filterPanel) {
            filterToggle.addEventListener('click', () => {
                filterPanel.classList.toggle('active');
            });
        }
        
        // Filter inputs
        const filterInputs = document.querySelectorAll('.filter-input, .filter-checkbox');
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    }
    
    setupNavigation() {
        // Logo click to go home
        if (this.logo) {
            this.logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.goHome();
            });
        }
        
    }
    
    handleSearchInput(query) {
        if (query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        // Simulate search suggestions
        const suggestions = this.getSearchSuggestions(query);
        this.displaySuggestions(suggestions);
    }
    
    getSearchSuggestions(query) {
        // Mock suggestions based on query
        const allSuggestions = [
            'iPhone 13 Pro Max',
            'MacBook Pro M2',
            'Samsung Galaxy S23',
            'Nintendo Switch',
            'PlayStation 5',
            'Tesla Model 3',
            'Honda Civic',
            'Toyota Camry',
            'Apartment for rent',
            'House for sale',
            'Room for rent',
            'Office space',
            'Web developer job',
            'Marketing manager',
            'Graphic designer',
            'Photography services',
            'Cleaning services',
            'Tutoring services'
        ];
        
        return allSuggestions
            .filter(suggestion => 
                suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5);
    }
    
    displaySuggestions(suggestions) {
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        this.searchSuggestions.innerHTML = suggestions
            .map(suggestion => `
                <div class="suggestion-item" data-suggestion="${suggestion}">
                    ${suggestion}
                </div>
            `).join('');
        
        // Add click listeners to suggestions
        this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.searchInput.value = item.dataset.suggestion;
                this.hideSuggestions();
                this.performSearch();
            });
        });
        
        this.showSuggestions();
    }
    
    showSuggestions() {
        this.searchSuggestions.style.display = 'block';
    }
    
    hideSuggestions() {
        this.searchSuggestions.style.display = 'none';
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            this.navigateToSearchResults(query);
        }
    }
    
    navigateToCategory(category) {
        // Hide homepage, show search results
        this.showSearchResults();
        this.loadCategoryResults(category);
    }
    
    navigateToSearchResults(query) {
        this.showSearchResults();
        this.loadSearchResults(query);
    }
    
    showSearchResults() {
        // Hide homepage elements
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.categories').style.display = 'none';
        
        // Show search results
        let resultsSection = document.querySelector('.search-results');
        if (!resultsSection) {
            resultsSection = this.createSearchResultsSection();
            document.querySelector('.main').appendChild(resultsSection);
        }
        resultsSection.style.display = 'block';
    }
    
    createSearchResultsSection() {
        const resultsSection = document.createElement('section');
        resultsSection.className = 'search-results';
        resultsSection.innerHTML = `
            
            
            <div class="results-header" style="display: none;">
                <div class="results-count" id="resultsCount">0 results found</div>
                <button class="filter-toggle">Filter</button>
            </div>
            
            <div class="results-layout">
                <div class="filter-panel">
                    <div class="filter-section">
                        <h3 class="filter-title">Price Range</h3>
                        <div class="filter-group">
                            <label class="filter-label">Min Price</label>
                            <input type="number" class="filter-input" id="minPrice" placeholder="0">
                        </div>
                        <div class="filter-group">
                            <label class="filter-label">Max Price</label>
                            <input type="number" class="filter-input" id="maxPrice" placeholder="10000">
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3 class="filter-title">Condition</h3>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="new" value="new">
                            <label for="new">New</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="likeNew" value="like-new">
                            <label for="likeNew">Like New</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="good" value="good">
                            <label for="good">Good</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="fair" value="fair">
                            <label for="fair">Fair</label>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3 class="filter-title">Distance</h3>
                        <div class="filter-group">
                            <label class="filter-label">Within</label>
                            <select class="filter-input" id="distance">
                                <option value="5">5 miles</option>
                                <option value="10">10 miles</option>
                                <option value="25">25 miles</option>
                                <option value="50">50 miles</option>
                                <option value="100">100+ miles</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h3 class="filter-title">Posted</h3>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="today" value="today">
                            <label for="today">Today</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="week" value="week">
                            <label for="week">This week</label>
                        </div>
                        <div class="filter-option">
                            <input type="checkbox" class="filter-checkbox" id="month" value="month">
                            <label for="month">This month</label>
                        </div>
                    </div>
                </div>
                
                <div class="results-column" id="resultsColumn">
                    <!-- Results will be populated here -->
                </div>
            </div>
        `;
        
        return resultsSection;
    }
    
    
    
    loadCategoryResults(category) {
        const categoryNames = {
            'services': 'Services',
            'housing': 'Housing',
            'jobs': 'Jobs',
            'community': 'Community',
            'personals': 'Personals',
            'forums': 'Forums',
            'gigs': 'Gigs'
        };
        
        const categoryName = categoryNames[category] || category;
        document.getElementById('resultsCount').textContent = `Browse ${categoryName}`;
        
        // Load mock data for the category
        const mockData = this.getMockDataForCategory(category);
        this.displayResults(mockData);
    }
    
    loadSearchResults(query) {
        document.getElementById('resultsCount').textContent = `Search results for "${query}"`;
        
        // Load mock search results
        const mockData = this.getMockSearchResults(query);
        this.displayResults(mockData);
    }
    
    getMockDataForCategory(category) {
        // Mock data based on category
        const mockData = {
            'services': [
                {
                    id: 1,
                    title: 'Professional House Cleaning Service - Weekly/Monthly',
                    price: '$80 - $150',
                    image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Cleaning',
                    location: 'Brooklyn, NY',
                    distance: '2.5 mi away',
                    timePosted: '2 hours ago',
                    seller: {
                        name: 'CleanProNYC',
                        rating: 4.9,
                        verified: true,
                        joinDate: '2020'
                    }
                },
                {
                    id: 2,
                    title: 'Graphic Design Services - Logos, Flyers, Business Cards',
                    price: '$50 - $200',
                    image: 'https://via.placeholder.com/200x150/6f42c1/ffffff?text=Design',
                    location: 'Manhattan, NY',
                    distance: '1.2 mi away',
                    timePosted: '4 hours ago',
                    seller: {
                        name: 'CreativeDesigns',
                        rating: 4.8,
                        verified: true,
                        joinDate: '2021'
                    }
                },
                {
                    id: 3,
                    title: 'Pet Sitting & Dog Walking Services',
                    price: '$25 - $40',
                    image: 'https://via.placeholder.com/200x150/ffc107/000000?text=Pet+Care',
                    location: 'Queens, NY',
                    distance: '3.8 mi away',
                    timePosted: '6 hours ago',
                    seller: {
                        name: 'PetLoverNY',
                        rating: 4.7,
                        verified: true,
                        joinDate: '2022'
                    }
                }
            ],
            'housing': [
                {
                    id: 4,
                    title: '2BR/1BA Apartment in Williamsburg - $2,800/month',
                    price: '$2,800',
                    image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Apartment',
                    location: 'Williamsburg, NY',
                    distance: '3.1 mi away',
                    timePosted: '2 hours ago',
                    seller: {
                        name: 'NYCProperties',
                        rating: 4.7,
                        verified: true,
                        joinDate: '2020'
                    }
                },
                {
                    id: 5,
                    title: 'Room for Rent in Shared House - $1,200/month',
                    price: '$1,200',
                    image: 'https://via.placeholder.com/200x150/ffc107/000000?text=Room+Rent',
                    location: 'Astoria, NY',
                    distance: '5.7 mi away',
                    timePosted: '6 hours ago',
                    seller: {
                        name: 'RoommateFinder',
                        rating: 4.3,
                        verified: true,
                        joinDate: '2022'
                    }
                },
                {
                    id: 6,
                    title: 'Studio Apartment in East Village - $2,200/month',
                    price: '$2,200',
                    image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Studio',
                    location: 'East Village, NY',
                    distance: '1.5 mi away',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'ManhattanRentals',
                        rating: 4.5,
                        verified: true,
                        joinDate: '2019'
                    }
                }
            ],
            'jobs': [
                {
                    id: 7,
                    title: 'Senior Frontend Developer - Remote',
                    price: '$120,000 - $150,000',
                    image: 'https://via.placeholder.com/200x150/6f42c1/ffffff?text=Developer+Job',
                    location: 'Remote',
                    distance: 'Remote',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'TechStartupNY',
                        rating: 4.9,
                        verified: true,
                        joinDate: '2021'
                    }
                },
                {
                    id: 8,
                    title: 'Marketing Manager - Full Time',
                    price: '$70,000 - $90,000',
                    image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Marketing',
                    location: 'Manhattan, NY',
                    distance: '2.1 mi away',
                    timePosted: '2 days ago',
                    seller: {
                        name: 'MarketingAgency',
                        rating: 4.6,
                        verified: true,
                        joinDate: '2020'
                    }
                },
                {
                    id: 9,
                    title: 'Part-time Retail Associate - Weekend Shifts',
                    price: '$18 - $22/hour',
                    image: 'https://via.placeholder.com/200x150/ffc107/000000?text=Retail',
                    location: 'Brooklyn, NY',
                    distance: '4.2 mi away',
                    timePosted: '3 days ago',
                    seller: {
                        name: 'RetailChainNY',
                        rating: 4.2,
                        verified: true,
                        joinDate: '2023'
                    }
                }
            ],
            'community': [
                {
                    id: 10,
                    title: 'Weekly Yoga Classes - All Levels Welcome',
                    price: '$15/class',
                    image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Yoga',
                    location: 'Park Slope, NY',
                    distance: '2.8 mi away',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'YogaStudioBK',
                        rating: 4.8,
                        verified: true,
                        joinDate: '2021'
                    }
                },
                {
                    id: 11,
                    title: 'Book Club Meeting - Mystery Novels',
                    price: 'Free',
                    image: 'https://via.placeholder.com/200x150/6f42c1/ffffff?text=Book+Club',
                    location: 'Upper West Side, NY',
                    distance: '3.5 mi away',
                    timePosted: '2 days ago',
                    seller: {
                        name: 'BookLoversNYC',
                        rating: 4.7,
                        verified: true,
                        joinDate: '2020'
                    }
                },
                {
                    id: 12,
                    title: 'Lost: Black Lab Mix - Reward Offered',
                    price: '$500 reward',
                    image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Lost+Dog',
                    location: 'Astoria, NY',
                    distance: '5.1 mi away',
                    timePosted: '3 days ago',
                    seller: {
                        name: 'PetOwner123',
                        rating: 4.9,
                        verified: true,
                        joinDate: '2022'
                    }
                }
            ],
            'personals': [
                {
                    id: 13,
                    title: 'Looking for Hiking Partner - Weekend Adventures',
                    price: 'Free',
                    image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Hiking',
                    location: 'Manhattan, NY',
                    distance: '1.8 mi away',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'OutdoorEnthusiast',
                        rating: 4.6,
                        verified: true,
                        joinDate: '2021'
                    }
                },
                {
                    id: 14,
                    title: 'Missed Connection - Coffee Shop on 5th Ave',
                    price: 'Free',
                    image: 'https://via.placeholder.com/200x150/ffc107/000000?text=Missed+Connection',
                    location: 'Midtown, NY',
                    distance: '0.9 mi away',
                    timePosted: '2 days ago',
                    seller: {
                        name: 'HopefulRomantic',
                        rating: 4.5,
                        verified: false,
                        joinDate: '2023'
                    }
                }
            ],
            'forums': [
                {
                    id: 15,
                    title: 'Discussion: Best Pizza Places in NYC',
                    price: 'Free',
                    image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Pizza+Talk',
                    location: 'NYC',
                    distance: 'Local',
                    timePosted: '4 hours ago',
                    seller: {
                        name: 'FoodieNYC',
                        rating: 4.8,
                        verified: true,
                        joinDate: '2020'
                    }
                },
                {
                    id: 16,
                    title: 'Tech Talk: AI and Machine Learning Trends',
                    price: 'Free',
                    image: 'https://via.placeholder.com/200x150/6f42c1/ffffff?text=Tech+Talk',
                    location: 'Online',
                    distance: 'Virtual',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'TechGuru',
                        rating: 4.9,
                        verified: true,
                        joinDate: '2019'
                    }
                }
            ],
            'gigs': [
                {
                    id: 17,
                    title: 'One-time Moving Help - 3 Hours',
                    price: '$80',
                    image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Moving+Help',
                    location: 'Brooklyn, NY',
                    distance: '2.3 mi away',
                    timePosted: '5 hours ago',
                    seller: {
                        name: 'MovingHelperNY',
                        rating: 4.7,
                        verified: true,
                        joinDate: '2022'
                    }
                },
                {
                    id: 18,
                    title: 'Photography Gig - Event Coverage',
                    price: '$200 - $400',
                    image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Photography',
                    location: 'Manhattan, NY',
                    distance: '1.5 mi away',
                    timePosted: '1 day ago',
                    seller: {
                        name: 'EventPhotographer',
                        rating: 4.9,
                        verified: true,
                        joinDate: '2021'
                    }
                },
                {
                    id: 19,
                    title: 'Tutoring - Math and Science (High School)',
                    price: '$40/hour',
                    image: 'https://via.placeholder.com/200x150/ffc107/000000?text=Tutoring',
                    location: 'Queens, NY',
                    distance: '4.7 mi away',
                    timePosted: '2 days ago',
                    seller: {
                        name: 'EduTutorNY',
                        rating: 4.8,
                        verified: true,
                        joinDate: '2020'
                    }
                }
            ]
        };
        
        return mockData[category] || [];
    }
    
    getMockSearchResults(query) {
        // Return mixed results for search
        const allResults = [
            ...this.getMockDataForCategory('services'),
            ...this.getMockDataForCategory('housing'),
            ...this.getMockDataForCategory('jobs'),
            ...this.getMockDataForCategory('community'),
            ...this.getMockDataForCategory('personals'),
            ...this.getMockDataForCategory('forums'),
            ...this.getMockDataForCategory('gigs')
        ];
        
        // Filter based on query
        return allResults.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    displayResults(results) {
        const resultsColumn = document.getElementById('resultsColumn');
        
        if (results.length === 0) {
            resultsColumn.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <h3>No results found</h3>
                    <p>Try adjusting your search terms or filters</p>
                </div>
            `;
            return;
        }
        
        resultsColumn.innerHTML = results.map(item => `
            <div class="listing-card" data-id="${item.id}">
                <div class="listing-content">
                    <div class="listing-image">
                        <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div style="display: none;">No image available</div>
                    </div>
                    <div class="listing-details">
                        <div class="listing-header">
                            <h3 class="listing-title">${item.title}</h3>
                            <div class="listing-price">${item.price}</div>
                            <div class="listing-meta">
                                <div class="listing-location">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    ${item.location}
                                </div>
                                <div class="listing-time">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12,6 12,12 16,14"></polyline>
                                    </svg>
                                    Posted ${item.timePosted}
                                </div>
                            </div>
                        </div>
                        <div class="listing-footer">
                            <div class="seller-info">
                                <div class="seller-rating">
                                    <span class="rating-stars">★★★★★</span>
                                    <span>${item.seller.rating}</span>
                                </div>
                                ${item.seller.verified ? '<span class="verified-badge">Verified</span>' : ''}
                                <span style="font-size: 0.8rem; color: #666;">Joined ${item.seller.joinDate}</span>
                            </div>
                            <button class="contact-btn">Contact Seller</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add click listeners to listing cards
        resultsColumn.querySelectorAll('.listing-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('contact-btn')) {
                    this.viewListing(card.dataset.id);
                }
            });
        });
        
        // Add click listeners to contact buttons
        resultsColumn.querySelectorAll('.contact-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.contactSeller(e.target.closest('.listing-card').dataset.id);
            });
        });
    }
    
    applyFilters() {
        // Get current filter values
        const minPrice = document.getElementById('minPrice')?.value;
        const maxPrice = document.getElementById('maxPrice')?.value;
        const condition = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
        const distance = document.getElementById('distance')?.value;
        const posted = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
        
        // In a real app, this would filter the results
        console.log('Applying filters:', { minPrice, maxPrice, condition, distance, posted });
    }
    
    viewListing(id) {
        alert(`Viewing listing ${id} - This would open a detailed view`);
    }
    
    contactSeller(id) {
        alert(`Contacting seller for listing ${id} - This would open contact form`);
    }
    
    goHome() {
        // Hide search results
        const resultsSection = document.querySelector('.search-results');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Show homepage elements
        document.querySelector('.hero').style.display = 'block';
        document.querySelector('.categories').style.display = 'block';
        
        // Clear search input
        this.searchInput.value = '';
        this.hideSuggestions();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CraigslistApp();
});
