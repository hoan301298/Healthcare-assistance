import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import heroImage from '@/assets/hero-healthcare.jpg';
import { features } from '@/content/features';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Your Health,
                <span className="text-primary"> Our Priority</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Find trusted healthcare facilities, book appointments, and get 24/7 support - all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/search">
                  <Button size="lg" className="bg-primary hover:bg-primary-dark w-full sm:w-auto">
                    Find Facilities
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Chat with Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img
                src={heroImage}
                alt="Healthcare professionals"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose HealthCare+
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make healthcare access simple, fast, and reliable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="border-border hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] hover:-translate-x-2 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-hero text-white border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of users who trust HealthCare+ for their medical needs
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  Create Free Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 HealthCare+. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
