import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, GraduationCap, Briefcase, Linkedin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AutoTranslate from '@/components/AutoTranslate';

type Alumni = Tables<'alumni'>;

const Alumni = () => {
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const { data: alumni = [], isLoading } = useQuery({
    queryKey: ['alumni-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alumni')
        .select('*')
        .order('graduation_year', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const graduationYears = [...new Set(alumni.map(a => a.graduation_year))].sort((a, b) => b - a);

  const filtered = alumni.filter(a => {
    const matchesSearch = !search || 
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.current_company?.toLowerCase().includes(search.toLowerCase()) ||
      a.current_position?.toLowerCase().includes(search.toLowerCase());
    const matchesYear = !selectedYear || a.graduation_year === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <AutoTranslate>
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary-dark text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-secondary rounded-full">
                <Users className="h-8 w-8 text-secondary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Alumni Network</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Connect with fellow graduates, share achievements, and stay part of the Excellence Academy family.
            </p>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, company, or position..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedYear === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedYear(null)}
              >
                All Years
              </Button>
              {graduationYears.slice(0, 8).map(year => (
                <Button
                  key={year}
                  variant={selectedYear === year ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{alumni.length}</p>
                <p className="text-sm text-muted-foreground">Total Alumni</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-secondary-dark">{graduationYears.length}</p>
                <p className="text-sm text-muted-foreground">Graduating Classes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-primary">{alumni.filter(a => a.is_featured).length}</p>
                <p className="text-sm text-muted-foreground">Featured Alumni</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-secondary-dark">{new Set(alumni.map(a => a.current_company).filter(Boolean)).size}</p>
                <p className="text-sm text-muted-foreground">Organizations</p>
              </CardContent>
            </Card>
          </div>

          {/* Alumni Grid */}
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading alumni...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No alumni found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(person => (
                <Card key={person.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={person.image_url || undefined} alt={person.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-foreground">{person.name}</h3>
                    {person.current_position && (
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                        <Briefcase className="h-3 w-3" />
                        <span>{person.current_position}</span>
                      </div>
                    )}
                    {person.current_company && (
                      <p className="text-sm text-muted-foreground">{person.current_company}</p>
                    )}
                    <Badge variant="secondary" className="mt-2">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Class of {person.graduation_year}
                    </Badge>
                    {person.bio && (
                      <p className="text-xs text-muted-foreground mt-3 line-clamp-3">{person.bio}</p>
                    )}
                    {person.linkedin_url && (
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <a href={person.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4 mr-1" /> Connect
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </AutoTranslate>
  );
};

export default Alumni;
