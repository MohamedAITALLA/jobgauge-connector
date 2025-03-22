import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format, differenceInYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { getCountryCodeByCountry, formatPhoneWithCountryCode } from "@/data/countryCodes";

interface UserInfoFormProps {
  onNext: () => void;
  onPrevious: () => void;
  className?: string;
  userInfo: UserInfo;
  onUserInfoChange: (userInfo: UserInfo) => void;
}

export interface UserInfo {
  fullName: string;
  birthDate: Date | undefined;
  gender: string;
  country: string;
  email: string;
  phone: string;
}

const genderOptions = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say"
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe"
];

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  onNext,
  onPrevious,
  className,
  userInfo,
  onUserInfoChange
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!userInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!userInfo.birthDate) {
      newErrors.birthDate = "Birth date is required";
    } else {
      // Check if user is at least 18 years old
      const today = new Date();
      const age = differenceInYears(today, userInfo.birthDate);
      
      if (age < 18) {
        newErrors.birthDate = "You must be at least 18 years old to apply";
      }
    }
    
    if (!userInfo.gender) {
      newErrors.gender = "Please select a gender";
    }
    
    if (!userInfo.country) {
      newErrors.country = "Please select a country";
    }
    
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(userInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!userInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9\s]+$/.test(userInfo.phone)) {
      newErrors.phone = "Please enter a valid phone number (digits only)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Format phone with country code only when submitting the form
      if (userInfo.country && userInfo.phone) {
        const countryCode = getCountryCodeByCountry(userInfo.country);
        if (countryCode) {
          // Create a new userInfo object with the formatted phone number
          const formattedUserInfo = {
            ...userInfo,
            phone: formatPhoneWithCountryCode(userInfo.phone, countryCode)
          };
          // Update the user info with the formatted phone number
          onUserInfoChange(formattedUserInfo);
        }
      }
      onNext();
    }
  };

  const handleChange = (field: keyof UserInfo, value: any) => {
    onUserInfoChange({
      ...userInfo,
      [field]: value
    });
    
    // Clear error when field is updated
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ""
      });
    }
  };
  
  // Update phone display when country changes
  useEffect(() => {
    if (userInfo.country) {
      // If country changed, clear any validation errors
      if (errors.phone) {
        setErrors({
          ...errors,
          phone: ""
        });
      }
    }
  }, [userInfo.country]);

  return (
    <div 
      className={cn(
        "glass-card rounded-xl p-6 shadow-md transition-all animate-scale-in",
        "w-full max-w-md mx-auto",
        className
      )}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
            Personal Information
          </div>
          <h3 className="text-xl font-semibold leading-tight">Tell us about yourself</h3>
          <p className="text-sm text-muted-foreground">Please provide your contact information to complete the application process.</p>
        </div>
        
        <div className="space-y-4 py-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={userInfo.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
          </div>
          
          {/* Birth Date */}
          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date <span className="text-xs text-muted-foreground">(must be 18+ years old)</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !userInfo.birthDate && "text-muted-foreground",
                    errors.birthDate ? "border-destructive" : ""
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {userInfo.birthDate ? format(userInfo.birthDate, "PPP") : <span>Select your birth date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={userInfo.birthDate}
                  onSelect={(date) => handleChange("birthDate", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.birthDate && <p className="text-xs text-destructive">{errors.birthDate}</p>}
          </div>
          
          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              value={userInfo.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                errors.gender ? "border-destructive" : ""
              )}
            >
              <option value="" disabled>Select your gender</option>
              {genderOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.gender && <p className="text-xs text-destructive">{errors.gender}</p>}
          </div>
          
          {/* Country */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              value={userInfo.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                errors.country ? "border-destructive" : ""
              )}
            >
              <option value="" disabled>Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="text-xs text-destructive">{errors.country}</p>}
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={userInfo.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email address"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <div className="flex-shrink-0 w-16 mr-2">
                <div className="h-10 px-3 flex items-center justify-center rounded-md border border-input bg-background text-sm text-muted-foreground">
                  {getCountryCodeByCountry(userInfo.country) || '+00'}
                </div>
              </div>
              <Input
                id="phone"
                type="tel"
                value={userInfo.phone}
                onChange={(e) => {
                  // Only allow digits and spaces
                  const value = e.target.value.replace(/[^0-9\s]/g, '');
                  handleChange("phone", value);
                }}
                placeholder="Enter your phone number"
                className={cn(errors.phone ? "border-destructive" : "", "flex-grow")}
                inputMode="numeric"
              />
            </div>
            {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            <p className="text-xs text-muted-foreground">Country code will be automatically added based on your country selection</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={onPrevious}
            className="btn-outline flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-1"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;