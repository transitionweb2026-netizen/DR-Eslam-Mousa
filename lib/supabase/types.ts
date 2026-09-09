/**
 * Hand-written types mirroring supabase/migrations exactly. Once a real
 * project is connected, regenerate this file for guaranteed drift-free
 * types with:
 *
 *   npx supabase gen types typescript --project-id <id> > lib/supabase/types.ts
 *
 * (keeping the JSDoc header and the two convenience aliases at the bottom).
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface LocalizedJson {
  en: string;
  ar: string;
}

export interface Database {
  public: {
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: "admin" | "editor";
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; email: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
        Relationships: never[];
      };
      media: {
        Row: {
          id: string;
          bucket_id: "media" | "video-covers" | "videos" | null;
          storage_path: string | null;
          external_url: string | null;
          file_name: string;
          mime_type: string;
          file_size: number | null;
          kind: "image" | "video" | "document";
          category: "doctor" | "services" | "conditions" | "certificates" | "videos" | "articles" | "general" | "seo";
          alt_text_en: string | null;
          alt_text_ar: string | null;
          width: number | null;
          height: number | null;
          duration_seconds: number | null;
          uploaded_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["media"]["Row"]> & {
          file_name: string;
          mime_type: string;
          kind: "image" | "video" | "document";
        };
        Update: Partial<Database["public"]["Tables"]["media"]["Row"]>;
        Relationships: never[];
      };
      site_settings: {
        Row: {
          id: true;
          website_title: string;
          website_url: string;
          org_name_en: string;
          org_name_ar: string;
          doctor_credentials_en: string;
          doctor_credentials_ar: string;
          logo_media_id: string | null;
          favicon_media_id: string | null;
          default_meta_description_en: string | null;
          default_meta_description_ar: string | null;
          default_og_image_id: string | null;
          default_language: "en" | "ar";
          default_robots: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
        Relationships: never[];
      };
      navbar_settings: {
        Row: {
          id: true;
          appointment_label_en: string;
          appointment_label_ar: string;
          appointment_url: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["navbar_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["navbar_settings"]["Row"]>;
        Relationships: never[];
      };
      footer_settings: {
        Row: {
          id: true;
          description_en: string | null;
          description_ar: string | null;
          copyright_en: string;
          copyright_ar: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["footer_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["footer_settings"]["Row"]>;
        Relationships: never[];
      };
      cta_settings: {
        Row: {
          id: true;
          heading_en: string;
          heading_ar: string;
          description_en: string | null;
          description_ar: string | null;
          primary_label_en: string;
          primary_label_ar: string;
          primary_url: string;
          secondary_label_en: string;
          secondary_label_ar: string;
          secondary_url: string;
          background_image_id: string | null;
          is_visible: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["cta_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["cta_settings"]["Row"]>;
        Relationships: never[];
      };
      contact_settings: {
        Row: {
          id: true;
          address_en: string;
          address_ar: string;
          location_image_id: string | null;
          location_image_alt_en: string | null;
          location_image_alt_ar: string | null;
          map_url: string;
          phone_display: string;
          phone_href: string;
          whatsapp_number: string;
          email: string;
          working_hours_en: string | null;
          working_hours_ar: string | null;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contact_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["contact_settings"]["Row"]>;
        Relationships: never[];
      };
      contact_form_settings: {
        Row: {
          id: true;
          title_en: string;
          title_ar: string;
          description_en: string | null;
          description_ar: string | null;
          field_labels: Json;
          success_message_en: string;
          success_message_ar: string;
          error_message_en: string;
          error_message_ar: string;
          whatsapp_template_en: string;
          whatsapp_template_ar: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["contact_form_settings"]["Row"]>;
        Update: Partial<Database["public"]["Tables"]["contact_form_settings"]["Row"]>;
        Relationships: never[];
      };
      navigation_items: {
        Row: {
          id: string;
          label_en: string;
          label_ar: string;
          url: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["navigation_items"]["Row"]> & { label_en: string; label_ar: string; url: string };
        Update: Partial<Database["public"]["Tables"]["navigation_items"]["Row"]>;
        Relationships: never[];
      };
      social_links: {
        Row: {
          id: string;
          platform: "phone" | "whatsapp" | "facebook" | "instagram" | "youtube" | "tiktok" | "twitter" | "linkedin";
          label_en: string;
          label_ar: string;
          value: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["social_links"]["Row"]> & {
          platform: Database["public"]["Tables"]["social_links"]["Row"]["platform"];
          label_en: string;
          label_ar: string;
          value: string;
        };
        Update: Partial<Database["public"]["Tables"]["social_links"]["Row"]>;
        Relationships: never[];
      };
      pages: {
        Row: {
          id: string;
          slug: string;
          name_en: string;
          name_ar: string;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["pages"]["Row"]> & { slug: string; name_en: string; name_ar: string };
        Update: Partial<Database["public"]["Tables"]["pages"]["Row"]>;
        Relationships: never[];
      };
      page_sections: {
        Row: {
          id: string;
          page_id: string;
          section_type: string;
          display_order: number;
          is_visible: boolean;
          content: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["page_sections"]["Row"]> & { page_id: string; section_type: string };
        Update: Partial<Database["public"]["Tables"]["page_sections"]["Row"]>;
        Relationships: never[];
      };
      page_seo: {
        Row: {
          id: string;
          page_id: string;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          meta_description_en: string | null;
          meta_description_ar: string | null;
          canonical_url: string | null;
          og_title_en: string | null;
          og_title_ar: string | null;
          og_description_en: string | null;
          og_description_ar: string | null;
          og_image_id: string | null;
          twitter_title_en: string | null;
          twitter_title_ar: string | null;
          twitter_description_en: string | null;
          twitter_description_ar: string | null;
          twitter_image_id: string | null;
          is_indexed: boolean;
          is_followed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["page_seo"]["Row"]> & { page_id: string };
        Update: Partial<Database["public"]["Tables"]["page_seo"]["Row"]>;
        Relationships: never[];
      };
      services: {
        Row: {
          id: string;
          slug: string;
          icon: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
          full_description_en: string[];
          full_description_ar: string[];
          benefits_en: string[];
          benefits_ar: string[];
          image_id: string | null;
          image_alt_en: string | null;
          image_alt_ar: string | null;
          cta_label_en: string | null;
          cta_label_ar: string | null;
          cta_url: string | null;
          display_order: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          slug: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
        Relationships: never[];
      };
      service_seo: {
        Row: {
          id: string;
          service_id: string;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          meta_description_en: string | null;
          meta_description_ar: string | null;
          canonical_url: string | null;
          og_image_id: string | null;
          is_indexed: boolean;
          is_followed: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["service_seo"]["Row"]> & { service_id: string };
        Update: Partial<Database["public"]["Tables"]["service_seo"]["Row"]>;
        Relationships: never[];
      };
      conditions: {
        Row: {
          id: string;
          slug: string;
          icon: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
          full_description_en: string[];
          full_description_ar: string[];
          benefits_en: string[];
          benefits_ar: string[];
          image_id: string | null;
          image_alt_en: string | null;
          image_alt_ar: string | null;
          cta_label_en: string | null;
          cta_label_ar: string | null;
          cta_url: string | null;
          display_order: number;
          is_active: boolean;
          is_featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["conditions"]["Row"]> & {
          slug: string;
          title_en: string;
          title_ar: string;
          short_description_en: string;
          short_description_ar: string;
        };
        Update: Partial<Database["public"]["Tables"]["conditions"]["Row"]>;
        Relationships: never[];
      };
      condition_seo: {
        Row: {
          id: string;
          condition_id: string;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          meta_description_en: string | null;
          meta_description_ar: string | null;
          canonical_url: string | null;
          og_image_id: string | null;
          is_indexed: boolean;
          is_followed: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["condition_seo"]["Row"]> & { condition_id: string };
        Update: Partial<Database["public"]["Tables"]["condition_seo"]["Row"]>;
        Relationships: never[];
      };
      statistics: {
        Row: {
          id: string;
          icon: string;
          value: number;
          prefix: string;
          suffix: string;
          label_en: string;
          label_ar: string;
          description_en: string | null;
          description_ar: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["statistics"]["Row"]> & { value: number; label_en: string; label_ar: string };
        Update: Partial<Database["public"]["Tables"]["statistics"]["Row"]>;
        Relationships: never[];
      };
      certificates: {
        Row: {
          id: string;
          image_id: string | null;
          image_alt_en: string | null;
          image_alt_ar: string | null;
          title_en: string;
          title_ar: string;
          institution_en: string;
          institution_ar: string;
          year: string;
          description_en: string | null;
          description_ar: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["certificates"]["Row"]> & {
          title_en: string;
          title_ar: string;
          institution_en: string;
          institution_ar: string;
          year: string;
        };
        Update: Partial<Database["public"]["Tables"]["certificates"]["Row"]>;
        Relationships: never[];
      };
      career_items: {
        Row: {
          id: string;
          year: string;
          icon: string;
          position_en: string;
          position_ar: string;
          institution_en: string;
          institution_ar: string;
          description_en: string | null;
          description_ar: string | null;
          image_id: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["career_items"]["Row"]> & {
          year: string;
          position_en: string;
          position_ar: string;
          institution_en: string;
          institution_ar: string;
        };
        Update: Partial<Database["public"]["Tables"]["career_items"]["Row"]>;
        Relationships: never[];
      };
      videos: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          description_en: string | null;
          description_ar: string | null;
          category_en: string | null;
          category_ar: string | null;
          cover_media_id: string | null;
          cover_alt_en: string | null;
          cover_alt_ar: string | null;
          video_media_id: string | null;
          external_url: string | null;
          duration_label: string | null;
          display_order: number;
          is_active: boolean;
          is_featured: boolean;
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["videos"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["videos"]["Row"]>;
        Relationships: never[];
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title_en: string;
          title_ar: string;
          excerpt_en: string | null;
          excerpt_ar: string | null;
          content_en: Json | null;
          content_ar: Json | null;
          image_id: string | null;
          image_alt_en: string | null;
          image_alt_ar: string | null;
          category_en: string | null;
          category_ar: string | null;
          author: string;
          read_time_minutes: number;
          status: "draft" | "published" | "archived";
          is_featured: boolean;
          display_order: number;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["articles"]["Row"]> & { slug: string; title_en: string; title_ar: string };
        Update: Partial<Database["public"]["Tables"]["articles"]["Row"]>;
        Relationships: never[];
      };
      article_seo: {
        Row: {
          id: string;
          article_id: string;
          seo_title_en: string | null;
          seo_title_ar: string | null;
          meta_description_en: string | null;
          meta_description_ar: string | null;
          canonical_url: string | null;
          og_title_en: string | null;
          og_title_ar: string | null;
          og_description_en: string | null;
          og_description_ar: string | null;
          og_image_id: string | null;
          is_indexed: boolean;
          is_followed: boolean;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["article_seo"]["Row"]> & { article_id: string };
        Update: Partial<Database["public"]["Tables"]["article_seo"]["Row"]>;
        Relationships: never[];
      };
      faqs: {
        Row: {
          id: string;
          question_en: string;
          question_ar: string;
          answer_en: string;
          answer_ar: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["faqs"]["Row"]> & {
          question_en: string;
          question_ar: string;
          answer_en: string;
          answer_ar: string;
        };
        Update: Partial<Database["public"]["Tables"]["faqs"]["Row"]>;
        Relationships: never[];
      };
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"];
