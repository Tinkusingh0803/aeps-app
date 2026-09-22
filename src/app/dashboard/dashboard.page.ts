import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertController,
  LoadingController,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  receiptOutline,
  swapHorizontalOutline,
  qrCodeOutline,
  walletOutline,
  fingerPrintOutline,
  cardOutline,
  airplaneOutline,
  gridOutline,
  flash,
  star,
  chevronForwardOutline,
  homeOutline,
  timeOutline,
  person,
} from 'ionicons/icons';
import { AepsService } from '../services/aeps.service';

interface ServiceTile {
  name: string;
  icon: string;
  action: string;
  highlight?: boolean;
  activeText?: boolean;
}

interface QuickAction {
  label: string;
  action: string;
}

interface PromoBanner {
  title: string;
  subtitle: string;
  cta: string;
}

interface OfferBanner extends PromoBanner {
  terms?: string;
}

type FooterTab = 'home' | 'transactions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class DashboardPage {

  @ViewChild('carouselTrack') carouselTrack?: ElementRef<HTMLDivElement>;
  services: ServiceTile[] = [
    { name: 'Bill Pay', icon: 'receipt-outline', action: 'bill_pay' },
    { name: 'Money\nTransfer', icon: 'swap-horizontal-outline', action: 'dmt' },
    { name: 'UPI Transfer', icon: 'qr-code-outline', action: 'upi' },
    { name: 'DMT Transfer', icon: 'wallet-outline', action: 'dmt_transfer' },
    { name: 'AEPS', icon: 'finger-print-outline', action: 'aeps', highlight: true, activeText: true },
    { name: 'Aadhaar Pay', icon: 'card-outline', action: 'aadhaar_pay' },
    { name: 'Travel', icon: 'airplane-outline', action: 'travel' },
    { name: 'View All', icon: 'grid-outline', action: 'view_all' },
  ];

  quickActions: QuickAction[] = [
    { label: 'Query Transaction', action: 'query_transaction' },
    { label: 'Raise Complaint', action: 'raise_complaint' },
    { label: 'Complaint Status', action: 'complaint_status' },
  ];

  banners: PromoBanner[] = [
    {
      title: 'Effortless & Instant Payments',
      subtitle: 'With secure, reliable and effortless payments',
      cta: 'EARN UP TO 5% MDR BENEFITS',
    },
    {
      title: 'Grow Your Business',
      subtitle: 'Unlock new revenue streams with our merchant tools',
      cta: 'EXPLORE MERCHANT SOLUTIONS',
    },
    {
      title: 'Refer & Earn',
      subtitle: 'Invite partners and earn rewards on every referral',
      cta: 'START REFERRING',
    },
  ];

  offers: OfferBanner[] = [
    {
      title: 'Get Instant Personal Loan',
      subtitle: 'Minimum interest rate on your loan with affordable range',
      cta: 'GET UP TO 5% INTEREST RATE',
      terms: 'Terms & Conditions Apply',
    },
  ];

  activeBannerIndex = 0;
  activeTab: FooterTab = 'home';


  constructor(
    private aepsService: AepsService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {
    addIcons({
      receiptOutline,
      swapHorizontalOutline,
      qrCodeOutline,
      walletOutline,
      fingerPrintOutline,
      cardOutline,
      airplaneOutline,
      gridOutline,
      flash,
      star,
      chevronForwardOutline,
      homeOutline,
      timeOutline,
      person,
    });
  }

  onProfileClick() {
    this.showAlert('Coming soon', 'Profile screen is not part of this prototype.');
  }

  onCarouselScroll(track: HTMLDivElement): void {
    const slideWidth = track.clientWidth;
    if (!slideWidth) {
      return;
    }
    this.activeBannerIndex = Math.round(track.scrollLeft / slideWidth);
  }

  onTileClick(tile: ServiceTile) {
    if (tile.action === 'aeps') {
      this.launchAeps();
    } else {
      this.showAlert('Coming soon', `${tile.name.replace('\n', ' ')} module is not part of this prototype.`);
    }
  }

  async launchAeps() {
    const loading = await this.loadingCtrl.create({
      message: 'Launching AEPS SDK...',
    });
    await loading.present();

    try {
      const result = await this.aepsService.launchOnboarding({
        pId: 'PS001707',
        pApiKey: 'UFMwMDE3MDcxZDE2ODM4N2FjOWQyNTQwYzk2NTJiYTE3OTZmNDY4Zg==',
        mCode: '101196',
        mobile: '9992212477',
        lat: '41.10',
        pipe: 'bank1',
        lng: '76.00',
        firm: 'Ananya Finance',
        email: 'ramit.mehta@prayasfinance.com',
      });

      await loading.dismiss();
      await this.showAlert('AEPS Result',
        `${result.message}`
      );
    } catch (err: any) {
      await loading.dismiss();
      await this.showAlert('Error', err?.message ?? 'Something went wrong');
    }
  }

  onActionClick(action: QuickAction) {
    this.showAlert('Coming soon', `${action.label} is not part of this prototype.`);
  }

  onViewAllOffers() {
    this.showAlert('Coming soon', 'Offers & Rewards listing is not part of this prototype.');
  }

  onTabClick(tab: FooterTab) {
    this.activeTab = tab;
  }

  onScanClick() {
    this.showAlert('Coming soon', 'QR scanner is not part of this prototype.');
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}