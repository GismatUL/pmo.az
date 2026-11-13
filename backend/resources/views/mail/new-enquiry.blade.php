<x-mail::message>
# Yeni müraciət

**Ad:** {{ $enquiry->name }}
**E-poçt:** {{ $enquiry->email }}
@if ($enquiry->phone)
**Telefon:** {{ $enquiry->phone }}
@endif
@if ($enquiry->company)
**Təşkilat:** {{ $enquiry->company }}
@endif
**Mənbə:** {{ $enquiry->source ?? '—' }}

{{ $enquiry->message }}

<x-mail::button :url="route('admin.enquiries.show', $enquiry)">
Admin paneldə aç
</x-mail::button>
</x-mail::message>
