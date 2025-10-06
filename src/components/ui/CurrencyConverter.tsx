import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Currency = 'UGX' | 'USD' | 'EUR' | 'GBP' | 'KES' | 'TZS';

interface CurrencyConverterProps {
  baseAmount: number;
  baseCurrency?: Currency;
}

const exchangeRates: Record<Currency, number> = {
  UGX: 1,
  USD: 0.00027, // 1 UGX = 0.00027 USD
  EUR: 0.00025, // 1 UGX = 0.00025 EUR
  GBP: 0.00021, // 1 UGX = 0.00021 GBP
  KES: 0.035,   // 1 UGX = 0.035 KES
  TZS: 0.68,    // 1 UGX = 0.68 TZS
};

const currencySymbols: Record<Currency, string> = {
  UGX: 'UGX',
  USD: '$',
  EUR: '€',
  GBP: '£',
  KES: 'KSh',
  TZS: 'TSh',
};

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  baseAmount, 
  baseCurrency = 'UGX' 
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const convertAmount = (amount: number, from: Currency, to: Currency): number => {
    const amountInUGX = from === 'UGX' ? amount : amount / exchangeRates[from];
    return amountInUGX * exchangeRates[to];
  };

  const formatCurrency = (amount: number, currency: Currency): string => {
    const converted = convertAmount(baseAmount, baseCurrency, currency);
    
    if (currency === 'UGX' || currency === 'KES' || currency === 'TZS') {
      return `${currencySymbols[currency]} ${converted.toLocaleString('en-US', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
      })}`;
    }
    
    return `${currencySymbols[currency]}${converted.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })}`;
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">View fees in</p>
          <Select value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as Currency)}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">🇺🇸 US Dollar (USD)</SelectItem>
              <SelectItem value="EUR">🇪🇺 Euro (EUR)</SelectItem>
              <SelectItem value="GBP">🇬🇧 British Pound (GBP)</SelectItem>
              <SelectItem value="KES">🇰🇪 Kenyan Shilling (KES)</SelectItem>
              <SelectItem value="TZS">🇹🇿 Tanzanian Shilling (TZS)</SelectItem>
              <SelectItem value="UGX">🇺🇬 Ugandan Shilling (UGX)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground mb-1">Approximate</p>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(baseAmount, selectedCurrency)}
          </p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        *Exchange rates are approximate and may vary. Official payments are in UGX.
      </p>
    </Card>
  );
};

export default CurrencyConverter;
