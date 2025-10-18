import React, { useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar, Tag, Share2, BookOpen, ArrowRight } from 'lucide-react';
import { getResourceBySlug, getRelatedResources } from '@/lib/resources';
import { ResourceCategory } from '@/types/resource';
import ReactMarkdown from 'react-markdown';

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const resource = slug ? getResourceBySlug(slug) : null;
  const relatedResources = slug ? getRelatedResources(slug) : [];
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
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

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  if (!resource) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
            <Button onClick={() => navigate('/resources')} className="bg-wellness-600 hover:bg-wellness-700">
              Browse Resources
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource.title,
          text: resource.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Featured Image */}
      {resource.featuredImage && (
        <div className="relative h-96 bg-gray-900">
          <img
            src={resource.featuredImage}
            alt={resource.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
      )}

      <div className="flex-grow pt-8 pb-16 px-4 bg-gray-50" ref={contentRef}>
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate('/resources')}
            className="mb-6 opacity-0 animate-on-scroll"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Button>

          {/* Main Content */}
          <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 opacity-0 animate-on-scroll">
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge variant="secondary" className={getCategoryColor(resource.category)}>
                {resource.category.replace('-', ' ')}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {resource.type}
              </Badge>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {resource.readTime} min read
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(resource.publishedDate)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {resource.title}
            </h1>

            {/* Author */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b">
              <div className="flex items-center space-x-4">
                {resource.author.avatar && (
                  <img
                    src={resource.author.avatar}
                    alt={resource.author.name}
                    className="w-14 h-14 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {resource.author.name}
                  </p>
                  {resource.author.credentials && (
                    <p className="text-sm text-gray-600">
                      {resource.author.credentials}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
              {resource.excerpt}
            </p>

            <Separator className="my-8" />

            {/* Content */}
            <div className="prose prose-lg max-w-none
              prose-headings:font-display prose-headings:font-bold
              prose-h1:text-3xl prose-h1:mb-4
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-wellness-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-wellness-600
              prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
            ">
              <ReactMarkdown>{resource.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            {resource.tags.length > 0 && (
              <>
                <Separator className="my-8" />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  {resource.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {/* Last Updated */}
            {resource.lastUpdated && (
              <p className="text-sm text-gray-500 mt-8">
                Last updated: {formatDate(resource.lastUpdated)}
              </p>
            )}
          </article>

          {/* Related Resources */}
          {relatedResources.length > 0 && (
            <div className="mt-16 opacity-0 animate-on-scroll">
              <h2 className="text-2xl font-display font-bold mb-6">
                Related Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedResources.map((related) => (
                  <Card key={related.id} className="hover:shadow-lg transition-shadow">
                    {related.featuredImage && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={related.featuredImage}
                          alt={related.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className={getCategoryColor(related.category)}>
                          {related.category.replace('-', ' ')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        {related.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Link to={`/resources/${related.slug}`}>
                        <Button variant="link" className="p-0 h-auto text-wellness-600 group">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <Card className="mt-16 bg-gradient-to-br from-wellness-50 to-white border-wellness-200 opacity-0 animate-on-scroll">
            <CardHeader>
              <CardTitle className="text-2xl">
                Ready to Start Your Weight Loss Journey?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                Get personalized medical guidance from our expert physicians and start seeing results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/" className="flex-1">
                  <Button className="w-full bg-wellness-600 hover:bg-wellness-700">
                    Get Started Today
                  </Button>
                </Link>
                <Link to="/resources" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse More Resources
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ResourceDetail;
