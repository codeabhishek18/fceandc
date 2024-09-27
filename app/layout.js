import { Poppins } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrappper";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "sonner";


export const metadata = 
{
  title: "FCE&C",
  description: "FCE&C - FinCrime Compliance Education & Consultancy",
};

export default async function RootLayout({ children }) 
{

  return (
    <html lang="en">
      <meta name="keywords" content="financial crime, FinCrime, financial crime prevention, fraud detection, anti-money laundering, financial security, compliance solutions, risk management"/>
      <meta property="og:title" content="Fints - FinCrime Trusted Source"/>  
      <meta property="og:description" content="Fints offers expert solutions for financial crime prevention. Explore our resources and insights to combat financial crime effectively."/>
      <meta property="og:image" content="fints"/>
      <meta property="og:url" content="https://www.fintsacademy.com"/>
      <SessionWrapper>
        <ReduxProvider>
          <body>
            {children}
            <Toaster toastOptions={{ style:{background : '#f0f0f0', color: '#435968', boxShadow:'var(--box-shadow)', padding: '30px ', fontSize: '16px'}}}/> 
          </body>
        </ReduxProvider>
      </SessionWrapper>
    </html>
  );
}
