import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type CardBrand = 'VISA' | 'MASTERCARD';
type CardStatus = 'Activa' | 'Inactiva';
type CardType = 'Crédito' | 'Débito';
type PaginationItem = number | '...';

interface UserCard {
  id: number;
  brand: CardBrand;
  lastDigits: string;
  holder: string;
  type: CardType;
  expiration: string;
  status: CardStatus;
}

@Component({
  selector: 'app-search-user-cards',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-user-cards.html',
})
export class SearchUserCards {
  private readonly fb = inject(FormBuilder);

  searchForm = this.fb.group({
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    selectedCardId: this.fb.control<number | null>(null),
    pageSize: this.fb.nonNullable.control(3),
  });

  isLoading = false;
  hasSearched = false;
  page = 1;

  cards: UserCard[] = [];

  private readonly staticCards: UserCard[] = [
    {
      id: 1,
      brand: 'VISA',
      lastDigits: '4242',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '12/26',
      status: 'Activa',
    },
    {
      id: 2,
      brand: 'VISA',
      lastDigits: '8888',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '08/25',
      status: 'Activa',
    },
    {
      id: 3,
      brand: 'MASTERCARD',
      lastDigits: '5555',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '06/27',
      status: 'Activa',
    },
    {
      id: 4,
      brand: 'VISA',
      lastDigits: '1001',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '04/27',
      status: 'Activa',
    },
    {
      id: 5,
      brand: 'MASTERCARD',
      lastDigits: '9090',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '09/26',
      status: 'Activa',
    },
    {
      id: 6,
      brand: 'VISA',
      lastDigits: '3322',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '01/28',
      status: 'Inactiva',
    },
    {
      id: 7,
      brand: 'VISA',
      lastDigits: '7788',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '03/29',
      status: 'Activa',
    },
    {
      id: 8,
      brand: 'MASTERCARD',
      lastDigits: '1209',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '07/28',
      status: 'Activa',
    },
    {
      id: 9,
      brand: 'VISA',
      lastDigits: '4512',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '10/27',
      status: 'Activa',
    },
    {
      id: 10,
      brand: 'VISA',
      lastDigits: '6721',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '05/29',
      status: 'Activa',
    },
    {
      id: 11,
      brand: 'MASTERCARD',
      lastDigits: '9910',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '11/26',
      status: 'Inactiva',
    },
    {
      id: 12,
      brand: 'VISA',
      lastDigits: '3008',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '02/28',
      status: 'Activa',
    },
    {
      id: 13,
      brand: 'VISA',
      lastDigits: '8821',
      holder: 'Juan Pérez',
      type: 'Débito',
      expiration: '04/29',
      status: 'Activa',
    },
    {
      id: 14,
      brand: 'MASTERCARD',
      lastDigits: '7130',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '09/28',
      status: 'Activa',
    },
    {
      id: 15,
      brand: 'VISA',
      lastDigits: '2468',
      holder: 'Juan Pérez',
      type: 'Crédito',
      expiration: '01/30',
      status: 'Activa',
    },
  ];

  get emailControl() {
    return this.searchForm.controls.email;
  }

  get selectedCardIdControl() {
    return this.searchForm.controls.selectedCardId;
  }

  get pageSizeControl() {
    return this.searchForm.controls.pageSize;
  }

  get selectedCardId(): number | null {
    return this.selectedCardIdControl.value;
  }

  get selectedCard(): UserCard | undefined {
    return this.cards.find((card) => card.id === this.selectedCardId);
  }

  get pageSize(): number {
    return Number(this.pageSizeControl.value);
  }

  get totalCards(): number {
    return this.cards.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalCards / this.pageSize);
  }

  get startIndex(): number {
    return (this.page - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalCards);
  }

  get paginatedCards(): UserCard[] {
    return this.cards.slice(this.startIndex, this.endIndex);
  }

  get paginationItems(): PaginationItem[] {
    const total = this.totalPages;
    const current = this.page;

    if (total <= 5) {
      return Array.from({ length: total }, (_, index) => index + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, '...', total];
    }

    if (current >= total - 2) {
      return [1, '...', total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
  }

  searchCards(): void {
    if (this.emailControl.invalid) {
      this.emailControl.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.hasSearched = true;
    this.page = 1;
    this.selectedCardIdControl.setValue(null);

    this.cards = this.staticCards;

    this.isLoading = false;
  }

  selectCard(cardId: number): void {
    this.selectedCardIdControl.setValue(cardId);
  }

  goToPage(item: PaginationItem): void {
    if (item === '...') return;
    if (item < 1 || item > this.totalPages) return;

    this.page = item;
  }

  previousPage(): void {
    if (this.page === 1) return;

    this.page--;
  }

  nextPage(): void {
    if (this.page === this.totalPages) return;

    this.page++;
  }
}
