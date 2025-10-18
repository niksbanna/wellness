import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Calendar, MapPin, Languages, Award } from 'lucide-react';
import { providers, searchProviders } from '@/lib/providers';
import { Provider } from '@/types/provider';

const ProviderDirectory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>(providers);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  // Get unique specialties
  const specialties = Array.from(
    new Set(providers.flatMap(p => p.specialties))
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProviders(providers);
    } else {
      setFilteredProviders(searchProviders(query));
    }
  };

  const handleSpecialtyFilter = (specialty: string) => {
    setSelectedSpecialty(specialty);
    if (specialty === 'all') {
      setFilteredProviders(providers);
    } else {
      setFilteredProviders(
        providers.filter(p => p.specialties.includes(specialty))
      );
    }
    setSearchQuery('');
  };

  // Animation on mount
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('animate-fade-up');
                el.classList.remove('opacity-0');
              }, i * 100);
            });
          }
        });
      },
      observerOptions
    );

    const currentHero = heroRef.current;
    const currentGrid = gridRef.current;

    if (currentHero) {
      observer.observe(currentHero);
    }
    if (currentGrid) {
      observer.observe(currentGrid);
    }

    return () => {
      if (currentHero) {
        observer.unobserve(currentHero);
      }
      if (currentGrid) {
        observer.unobserve(currentGrid);
      }
    };
  }, []);

  // Re-animate cards when filtered providers change
  useEffect(() => {
    const cards = document.querySelectorAll('.provider-card');
    cards.forEach((card, i) => {
      card.classList.remove('animate-fade-up');
      card.classList.add('opacity-0');
      setTimeout(() => {
        card.classList.add('animate-fade-up');
        card.classList.remove('opacity-0');
      }, i * 50);
    });
  }, [filteredProviders]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-4 bg-gradient-to-br from-wellness-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 opacity-0 animate-on-scroll">
              Meet Our Care Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto opacity-0 animate-on-scroll">
              Expert physicians, dietitians, and wellness specialists dedicated to your health journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search by name, specialty, or language..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {/* Specialty Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedSpecialty === 'all' ? 'default' : 'outline'}
              onClick={() => handleSpecialtyFilter('all')}
              className={selectedSpecialty === 'all' ? 'bg-wellness-600 hover:bg-wellness-700' : ''}
            >
              All Specialists
            </Button>
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? 'default' : 'outline'}
                onClick={() => handleSpecialtyFilter(specialty)}
                className={selectedSpecialty === specialty ? 'bg-wellness-600 hover:bg-wellness-700' : ''}
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Grid */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredProviders.length} {filteredProviders.length === 1 ? 'provider' : 'providers'}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedSpecialty !== 'all' && ` in ${selectedSpecialty}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider) => (
              <Card key={provider.id} className="provider-card hover:shadow-lg transition-shadow opacity-0">
                <CardHeader>
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{provider.name}</CardTitle>
                      <CardDescription className="text-sm">{provider.credentials}</CardDescription>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-semibold">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({provider.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.specialties.slice(0, 2).map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-wellness-100 text-wellness-700">
                        {specialty}
                      </Badge>
                    ))}
                    {provider.specialties.length > 2 && (
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        +{provider.specialties.length - 2} more
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Quick Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-wellness-600" />
                      <span>{provider.yearsExperience} years experience</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-wellness-600" />
                      <span>{provider.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-wellness-600" />
                      <span>Virtual Consultations</span>
                    </div>
                  </div>

                  {/* Status */}
                  {provider.acceptingNewPatients && (
                    <Badge className="bg-green-100 text-green-700">
                      Accepting New Patients
                    </Badge>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Link to={`/providers/${provider.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Profile
                      </Button>
                    </Link>
                    <Link to={`/schedule/${provider.id}`} className="flex-1">
                      <Button className="w-full bg-wellness-600 hover:bg-wellness-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Book
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                No providers found matching your search.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('all');
                  setFilteredProviders(providers);
                }}
                className="bg-wellness-600 hover:bg-wellness-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Team */}
      <section ref={gridRef} className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12 opacity-0 animate-on-scroll">
            Why Choose Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center opacity-0 animate-on-scroll">
              <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-wellness-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Board Certified</h3>
              <p className="text-gray-600">
                All our physicians are board-certified in obesity medicine and weight management
              </p>
            </div>
            <div className="text-center opacity-0 animate-on-scroll">
              <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-wellness-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Virtual appointments available 7 days a week to fit your schedule
              </p>
            </div>
            <div className="text-center opacity-0 animate-on-scroll">
              <div className="w-16 h-16 bg-wellness-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-wellness-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Highly Rated</h3>
              <p className="text-gray-600">
                Average rating of 4.8 stars from thousands of satisfied patients
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProviderDirectory;
