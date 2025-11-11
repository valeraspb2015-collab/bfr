import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertOwnerApplicationSchema } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";

const formSchema = insertOwnerApplicationSchema.extend({
  city: z.string().min(1, "Укажите город"),
  name: z.string().min(1, "Укажите ваше имя"),
  phone: z.string().min(1, "Укажите телефон"),
  listingUrl: z.string().url("Укажите корректную ссылку").min(1, "Укажите ссылку на квартиру"),
  question: z.string().optional(),
});

export type OwnerApplicationFormData = z.infer<typeof formSchema>;

interface OwnerApplicationFormProps {
  onBack: () => void;
  onSubmit: (data: OwnerApplicationFormData) => void;
}

export default function OwnerApplicationForm({ onBack, onSubmit }: OwnerApplicationFormProps) {
  const form = useForm<OwnerApplicationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      name: "",
      phone: "",
      listingUrl: "",
      question: "",
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
            Заявка для хозяев
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Присоединяйтесь к сообществу БФР
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Город</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Санкт-Петербург"
                        {...field}
                        data-testid="input-city"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2. Имя</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ваше имя"
                        {...field}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Телефон</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        {...field}
                        data-testid="input-phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="listingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>4. Ссылка на квартиру на любом сайте онлайн бронирования</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://..."
                        {...field}
                        data-testid="input-listing-url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>5. Ваш вопрос (если есть)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Опишите ваш вопрос..."
                        className="min-h-[100px]"
                        {...field}
                        data-testid="input-question"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
                size="lg"
                data-testid="button-submit-owner-application"
              >
                Отправить заявку
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
