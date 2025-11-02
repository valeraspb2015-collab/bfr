# Design Guidelines for БФР Apartment Platform

## Design Approach
**Reference-Based Approach**: Strictly following the provided HTML template's aesthetic and extending it systematically for additional features (forms, dashboards, admin panels).

## Core Design Principles
- Clean, trustworthy interface emphasizing direct owner-tenant connection
- Professional Russian localization throughout
- Soft, approachable gradient aesthetics with business credibility
- No distracting animations - focus on clarity and efficiency

## Typography System

**Font Family**: "Segoe UI", sans-serif (Windows-native feel)

**Hierarchy**:
- H1 (Hero): 28px (22px mobile), weight 600, color #004d80
- H2 (Section): 24px (20px mobile), weight 600, color #004d80  
- H3 (Cards): 18px, weight 600, color #333
- Body: 16px (15px mobile), weight 400, color #333
- Caption: 15px, weight 400, color #666

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 10, 12 (p-2, p-4, p-6, p-8, p-10, p-12 for sections)

**Container Strategy**:
- Max-width: 900px for content sections
- Padding: 30px desktop, 20px mobile
- Section margin: 40px vertical spacing between sections
- Card gaps: 20px between grid items

## Color Palette

**Primary Blue**: #0078d7 (buttons, interactive elements)
**Dark Blue**: #004d80 (headings, emphasis)
**Hover Blue**: #005fa3 (button hover states)

**Backgrounds**:
- Page: #f4f6f8 (light cool gray)
- Cards/Sections: #ffffff
- Gradient Header: linear-gradient(135deg, #e0f0ff, #d8ecf5)
- Step Cards: #f9fcff (very light blue tint)

**Borders**: #e0e0e0 (1px), #bcd0e6 (2px for header)
**Shadows**: 0 4px 12px rgba(0,0,0,0.08)

## Component Library

### Buttons
- Background: #0078d7, hover #005fa3
- Padding: 14px 28px (12px 22px mobile)
- Font: 18px (16px mobile)
- Border-radius: 8px
- Transition: 0.3s all properties

### Cards/Steps
- Background: #f9fcff
- Border: 1px solid #e0e0e0
- Border-radius: 8px
- Padding: 20px
- Flex layout: 1 1 250px (responsive grid)

### Sections
- Background: white
- Border-radius: 10px
- Box-shadow: 0 4px 12px rgba(0,0,0,0.08)
- Padding: 30px
- Max-width: 900px centered

### Forms (New)
- Input fields: 1px solid #e0e0e0, 8px border-radius, 14px padding
- Focus state: 2px border #0078d7, subtle shadow
- Labels: 15px, color #555, margin-bottom 8px
- Form sections: Same white card style with 30px padding

### Dashboards (New)
- Sidebar: #f9fcff background, 250px width
- Content area: White background, remaining flex space
- Table rows: Alternating subtle #f4f6f8 and white
- Status badges: 6px border-radius, 6px 12px padding, colored backgrounds

## Page Layouts

### Landing Page (Provided Template)
**Hero Section**:
- Gradient background: linear-gradient(135deg, #e0f0ff, #d8ecf5)
- Centered content with 40px vertical padding
- Primary CTA button prominently displayed
- Border-bottom: 2px solid #bcd0e6

**Why Choose BFR Section**:
- 3-column grid (1 column mobile)
- Icon + title + description cards
- Emojis for visual interest: 🏠 ⚡ 💬

**How It Works Section**:
- Numbered list (ol) with clear steps
- CTA button repeated for conversion

**Footer**:
- Centered text, 30px padding
- Contact info: Telegram @bfr_admin, WhatsApp phone
- Copyright with organization name

### Request Form Page (New)
- Single column, 600px max-width
- Multi-step form with progress indicator (blue dots)
- Input groups with labels above fields
- Location, budget range, room count, move-in date fields
- Large submit button at bottom

### Owner Dashboard (New)
- Left sidebar navigation: My Listings, Add Property, Requests, Profile
- Main content: Grid of property cards (2 columns desktop, 1 mobile)
- Each card: Image placeholder, address, price, rooms, status badge
- Add Property button: Floating action button style, #0078d7

### Admin Panel (New)
- Data table layout: Request ID, Tenant Name, Location, Budget, Status, Date
- Filter controls: Dropdown for status (New, In Progress, Completed)
- Row actions: View Details, Contact, Mark Complete buttons (small, secondary style)

## Images

**Hero Section**: No image required (gradient background maintains template aesthetic)

**Property Cards**: 
- Aspect ratio: 16:9 or 4:3
- Placeholder: Light gray #e0e0e0 with centered icon or text
- Border-radius: 8px 8px 0 0 (top corners only)
- Size: Full card width, ~200px height

**Owner Avatars** (if used):
- Circular, 48px diameter
- Border: 2px solid #e0e0e0
- Fallback: Initials on #0078d7 background

## Responsive Breakpoints
- Mobile: < 600px (single column, reduced padding/font sizes)
- Tablet: 600px - 900px (2 columns where appropriate)
- Desktop: > 900px (full layout with specified max-widths)

## Accessibility
- Maintain 4.5:1 contrast ratio (current colors comply)
- Form labels always visible (no placeholder-only patterns)
- Focus indicators: 2px #0078d7 outline with 2px offset
- Button states clearly indicated through color changes