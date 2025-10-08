import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  questions: FaqItem[];
}

export default function Faq({ questions }: FaqProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-6">
      {questions.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-2 border-grafito/10 rounded-2xl px-6 md:px-8 bg-white hover:shadow-xl hover:border-rio/30 transition-all"
        >
          <AccordionTrigger className="text-left hover:no-underline py-6 hover:text-rio transition-colors">
            <span className="font-display font-bold text-lg md:text-xl text-grafito">{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className="text-grafito/70 pb-6 text-base md:text-lg leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
