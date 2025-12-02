import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/ui/StatsCard';
import NewsCard from '@/components/ui/NewsCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import AccreditationBadge from '@/components/ui/AccreditationBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';

// Import images
import heroImage from '@/assets/hero-students.jpg';
import classroomImage from '@/assets/classroom-scene.jpg';

const Index = () => {
  const { t } = useLanguage();

  // Fetch latest 3 published news items from database
  const { data: latestNews, isLoading: newsLoading } = useQuery({
    queryKey: ['latest-news-home'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_items')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-75"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
              {t('hero.title')}
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-primary-foreground/90 animate-fade-in-up [--animation-delay:200ms] animate-stagger">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [--animation-delay:400ms] animate-stagger">
              <Button variant="secondary" size="xl" className="border-2 border-primary-foreground/30 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" asChild>
                <Link to="/admissions">
                  {t('cta.applyNow')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" asChild>
                <Link to="/membership">
                  {t('cta.joinPTA')}
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" asChild>
                <Link to="/shop">
                  {t('cta.schoolShop')}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]" asChild>
                <Link to="/donate">
                  {t('cta.supportUs')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title={t('stats.yearsOfExcellence')}
              value="25+"
              description={t('stats.yearsDesc')}
              icon={<Award className="h-6 w-6" />}
            />
            <StatsCard
              title={t('stats.happyStudents')}
              value="1,200+"
              description={t('stats.studentsDesc')}
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title={t('stats.qualifiedTeachers')}
              value="80+"
              description={t('stats.teachersDesc')}
              icon={<GraduationCap className="h-6 w-6" />}
            />
            <StatsCard
              title={t('stats.nationalAwards')}
              value="15+"
              description={t('stats.awardsDesc')}
              icon={<BookOpen className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* News & Events Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('home.newsTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.newsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {newsLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </>
            ) : latestNews && latestNews.length > 0 ? (
              latestNews.map((news) => (
                <NewsCard
                  key={news.id}
                  title={news.title}
                  excerpt={news.short_description}
                  date={format(new Date(news.created_at), 'MMMM d, yyyy')}
                  image={news.image_url || classroomImage}
                  href={`/news/${news.slug}`}
                  category={news.category}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                No news items available yet.
              </div>
            )}
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">
                {t('cta.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('home.testimonialsTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('home.testimonialsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Excellence Academy has transformed my daughter's approach to learning. The teachers are incredibly supportive and the environment encourages both academic and personal growth."
              author="Sarah Nakato"
              role="Parent of S.4 Student"
            />
            <TestimonialCard
              quote="The science programs here are exceptional. I gained the skills and confidence that helped me secure admission to Makerere University for my engineering degree."
              author="James Okello"
              role="Alumni, Class of 2023"
            />
            <TestimonialCard
              quote="I love the house system and how it brings students together. The leadership opportunities have helped me develop confidence and teamwork skills."
              author="Grace Atuhaire"
              role="Head Girl, S.6 Student"
            />
          </div>
        </div>
      </section>

      {/* International Accreditations & Partnerships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t('home.accreditationsTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.accreditationsSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AccreditationBadge
              name="Cambridge International"
              organization="Cambridge Assessment International Education"
              year="2010"
              description="Authorized Cambridge International School offering IGCSE and A-Level programs recognized worldwide."
              verified
            />
            <AccreditationBadge
              name="IB World School"
              organization="International Baccalaureate"
              year="2015"
              description="Authorized to offer the IB Diploma Programme, recognized by universities globally."
              verified
            />
            <AccreditationBadge
              name="COBIS Membership"
              organization="Council of British International Schools"
              year="2018"
              description="Member of COBIS, ensuring British educational standards and international best practices."
              verified
            />
            <AccreditationBadge
              name="Ministry of Education"
              organization="Republic of Uganda"
              year="1999"
              description="Fully registered and accredited by the Uganda Ministry of Education and Sports."
              verified
            />
            <AccreditationBadge
              name="East African Examination Council"
              organization="EAEC"
              year="2012"
              description="Recognized examination center for East African Community educational assessments."
              verified
            />
            <AccreditationBadge
              name="UNESCO Associated School"
              organization="UNESCO ASPnet"
              year="2020"
              description="Part of UNESCO's global network promoting quality education, peace, and sustainable development."
              verified
            />
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-center mb-6">{t('home.universityPartnerships')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
              <div className="text-center p-4">
                <p className="font-semibold text-sm">University of Oxford</p>
                <p className="text-xs text-muted-foreground">Academic Exchange</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">MIT</p>
                <p className="text-xs text-muted-foreground">STEM Programs</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">Makerere University</p>
                <p className="text-xs text-muted-foreground">Research Partner</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">Yale University</p>
                <p className="text-xs text-muted-foreground">Leadership Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
