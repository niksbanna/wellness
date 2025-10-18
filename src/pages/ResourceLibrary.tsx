import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, FileText, HelpCircle, Newspaper, Clock, ArrowRight } from 'lucide-react';
import { resources, getResourcesByCategory, getResourcesByType, searchResources } from '@/lib/resources';
import { ResourceType, ResourceCategory } from '@/types/resource';

const ResourceLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [filteredResources, setFilteredResources] = useState(resources);
  const heroRef = useRef<HTMLElement>(null);

  const categories: { value: ResourceCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Topics' },
    { value: 'weight-loss', label: 'Weight Loss' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'exercise', label: 'Exercise' },
    { value: 'medications', label: 'Medications' },
    { value: 'mental-health', label: 'Mental Health' },
    { value: 'success-stories', label: 'Success Stories' },
  ];

  const types: { value: ResourceType | 'all'; label: string; icon: any }[] = [
    { value: 'all', label: 'All Types', icon: BookOpen },
    { value: 'blog', label: 'Blog Posts', icon: Newspaper },
    { value: 'guide', label: 'Guides', icon: FileText },
    { value: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  useEffect(() => {
    let results = resources;

    if (searchQuery) {
      results = searchResources(searchQuery);
    }

    if (selectedCategory !== 'all') {
      results = results.filter(r => r.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      results = results.filter(r => r.type === selectedType);
    }

    setFilteredResources(results);
  }, [searchQuery, selectedCategory, selectedType]);

  // Animations
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
              }, i * 50);
            });
          }
        });
      },
      observerOptions
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const getTypeIcon = (type: ResourceType) => {
    const typeObj = types.find(t => t.value === type);
    return typeObj ? typeObj.icon : BookOpen;
  };

  const getCategoryColor = (category: ResourceCategory): string => {
    const colors: Record<ResourceCategory, string> = {
      'weight-loss': 'bg-blue-100 text-blue-700',
      'nutrition': 'bg-green-100 text-green-700',
      'exercise': 'bg-purple-100 text-purple-700',
      'medications': 'bg-orange-100 text-orange-700',
      'mental-health': 'bg-pink-100 text-pink-700',
      'success-stories': 'bg-yellow-100 text-yellow-700',
      'general': 'bg-gray-100 text-gray-700',
    };
    return colors[category] || colors.general;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-4 bg-gradient-to-br from-wellness-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4 opacity-0 animate-on-scroll">
              Resource Library
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto opacity-0 animate-on-scroll">
              Expert guidance, evidence-based articles, and inspiring stories to support your weight loss journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 opacity-0 animate-on-scroll">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-6 opacity-0 animate-on-scroll">
            {types.map((type) => {
              const Icon = type.icon;
              return (
                <Button
                  key={type.value}
                  variant={selectedType === type.value ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type.value)}
                  className={selectedType === type.value ? 'bg-wellness-600 hover:bg-wellness-700' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {type.label}
                </Button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center opacity-0 animate-on-scroll">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.value)}
                size="sm"
                className={selectedCategory === category.value ? 'bg-wellness-600 hover:bg-wellness-700' : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource, index) => {
                const Icon = getTypeIcon(resource.type);
                return (
                  <Card
                    key={resource.id}
                    className="resource-card hover:shadow-lg transition-all opacity-0 flex flex-col"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {resource.featuredImage && (
                      <div className="h-48 overflow-hidden">
                        <img
                          src={resource.featuredImage}
                          alt={resource.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-wellness-600" />
                        <Badge variant="secondary" className={getCategoryColor(resource.category)}>
                          {resource.category.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center ml-auto">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.readTime} min read
                        </span>
                      </div>
                      <CardTitle className="text-xl mb-2 line-clamp-2">
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {resource.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {resource.author.avatar && (
                            <img
                              src={resource.author.avatar}
                              alt={resource.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">{resource.author.name}</p>
                            {resource.author.credentials && (
                              <p className="text-xs text-gray-500">{resource.author.credentials}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link to={`/resources/${resource.slug}`} className="mt-4 block">
                        <Button variant="link" className="p-0 h-auto text-wellness-600 group">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">
                No resources found matching your criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="bg-wellness-600 hover:bg-wellness-700"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get personalized medical guidance and support from our expert team
          </p>
          <Link to="/" className="btn-primary">
            Get Started Today
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResourceLibrary;
