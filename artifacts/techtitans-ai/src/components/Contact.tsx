import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { FadeIn } from "./ui/fade-in";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/contact`.replace(/\/+/g, "/").replace(/^\//, "/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setIsSuccess(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Info */}
          <div>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
                Let's Work <span className="text-gradient">Together</span>
              </h2>
              <p className="text-foreground-muted text-lg mb-12 max-w-md">
                Ready to elevate your digital presence? Reach out to us to discuss your project, and let's create something extraordinary.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-foreground-muted">gameralipmk@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Location</h4>
                    <p className="text-foreground-muted">India &amp; Global Remote Team</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Response Time</h4>
                    <p className="text-foreground-muted">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Form */}
          <FadeIn delay={0.2} direction="left">
            <div className="glass-card rounded-3xl p-8 lg:p-10 relative">
              {isSuccess ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-surface/50 backdrop-blur-md rounded-3xl z-20">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-foreground-muted">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 ml-1">Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80 ml-1">Email</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Service Required</label>
                  <select
                    required
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 1rem center",
                      backgroundSize: "1.2em",
                    }}
                  >
                    <option value="" disabled className="bg-[#111827] text-white/50">Select a service...</option>
                    <option value="Branding" className="bg-[#111827] text-white">Branding</option>
                    <option value="Video Editing" className="bg-[#111827] text-white">Video Editing</option>
                    <option value="Graphic Design" className="bg-[#111827] text-white">Graphic Design</option>
                    <option value="Web Development" className="bg-[#111827] text-white">Web Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Message</label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
