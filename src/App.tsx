import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import Index from "./pages/Index";
import StudentDetails from "./pages/StudentDetails";
import Streams from "./pages/Streams";
import StreamOverview from "./pages/StreamOverview";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Documentation from "./pages/Documentation";
import CodeListing from "./pages/CodeListing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <StudentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/details" element={<StudentDetails />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/stream/:streamId" element={<StreamOverview />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/code-listing" element={<CodeListing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </StudentProvider>
  </QueryClientProvider>
);

export default App;
