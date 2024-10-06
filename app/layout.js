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
      <meta name="keywords" content="CAMS, CGSS, AML, Compliance"/>
      <meta property="og:title" content="FCE&C - FinCrime Compliance Education & Consultancy"/>  
      <meta property="og:description" content="FCE&Cs offers  high-quality materials, live interactive classes and practice sessions, all crafted by industry expert to clear CAMS & CGSS. Explore our resources and insights to combat financial crime effectively."/>
      <meta property="og:image" content="fce&c"/>
      {/* <meta property="og:url" content="https://www.fintsacademy.com"/> */}
      <SessionWrapper>
        <ReduxProvider>
          <body>
            {children}
            <Toaster toastOptions={{ style:{background : 'var(--primary-color)', color: 'var(--action-color)', boxShadow:'var(--box-shadow)', padding: '30px ', fontSize: '16px', border:'0'}}}/> 
          </body>
        </ReduxProvider>
      </SessionWrapper>
    </html>
  );
}
