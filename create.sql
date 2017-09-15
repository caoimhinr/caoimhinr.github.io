create table item(
	Id int primary key,
	Name nvarchar(64),
	Gold int,
	IsConsumable bit,
	IsEquippable bit,
	Equipped bit,
	ConsumableExp int,
	ConsumableCurrentHP int,
	ConsumableHP int,
	ConsumableATK int,
	ConsumableDEF int,
	ConsumableSPD int,
	ConsumableWIS int,
	ATK int,
	WIS int,
	Combo int
);

create table npc(
	Id int primary key,
	Name nvarchar(64),
	HP int,
	CurrentHP int,
	ATK int,
	DEF int,
	SPD int,
	WIS int,
	[EXP] int,
	Gold int
);

create table combo(
	Id int primary key,
	Name nvarchar(64),
	ItemSequence nvarchar(8),
	ComboSequence nvarchar(8),
	AnyCombo bit,
	ModATK int,
	ModWIS int,
	ProcRate int
);