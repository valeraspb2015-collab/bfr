import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Request from "@/pages/request";
import OwnerApplication from "@/pages/owner-application";
import Owner from "@/pages/owner";
import Admin from "@/pages/admin";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import BronnikChat from "@/components/BronnikChat";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/request" component={Request} />
      <Route path="/owner-application" component={OwnerApplication} />
      <Route path="/owner" component={Owner} />
      <Route path="/admin" component={Admin} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <BronnikChat />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
