"use client";

import * as React from "react";
import { PikaIcon } from "@pikaicons/react";
import { CheckTickSquareIcon } from "@pikaicons/core-free";
import { Avatar, AvatarGroup } from "@/components/tessera/avatar";
import { Badge } from "@/components/tessera/badge";
import { Button } from "@/components/tessera/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/tessera/card";
import { Dialog, DialogClose } from "@/components/tessera/dialog";
import { Field } from "@/components/tessera/input";
import { Input } from "@/components/tessera/input";
import { Select } from "@/components/tessera/select";
import { Switch } from "@/components/tessera/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tessera/tabs";
import { ThemeSwitcher } from "@/components/tessera/theme-switcher";
import { useToast } from "@/components/tessera/toast";

const people = [
  { alt: "Mira Sol", fallback: "MS" },
  { alt: "Jun Rao", fallback: "JR" },
  { alt: "Ada Kemi", fallback: "AK" },
  { alt: "Leo Neri", fallback: "LN" },
];

export function HeroStage() {
  const { toast } = useToast();

  return (
    <div className="hero-stage relative overflow-hidden rounded-[14px] border border-ts-line">
      <span className="stage-ring" aria-hidden="true" />
      <span className="stage-tile right-[8%] top-[12%]" aria-hidden="true" />
      <span className="stage-tile bottom-[15%] left-[6%] size-10 opacity-[0.08]" aria-hidden="true" />

      <div className="absolute inset-x-5 top-4 z-20 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.13em] text-ts-muted">
        <span>Specimen / 01</span>
        <span>Workbench</span>
      </div>

      <div className="relative z-10 w-[min(100%-2.5rem,430px)] py-14">
        <Card className="overflow-visible shadow-ts">
          <CardHeader className="flex-row items-start justify-between gap-3 border-b border-ts-line pb-3.5">
            <div className="min-w-0">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.13em] text-ts-muted">
                Studio profile
              </p>
              <CardTitle className="mt-1 truncate text-[18px] tracking-[-0.03em]">
                Atelier North
              </CardTitle>
            </div>
            <div className="flex shrink-0 items-center">
              <AvatarGroup>
                {people.slice(0, 3).map((person) => (
                  <Avatar key={person.alt} alt={person.alt} size="sm" fallback={person.fallback} />
                ))}
              </AvatarGroup>
              <Badge tone="outline" className="ml-2 hidden sm:inline-flex">
                +4
              </Badge>
            </div>
          </CardHeader>

          <div className="px-[18px] pt-3.5">
            <Tabs defaultValue="general">
              <TabsList aria-label="Profile settings">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <div className="min-h-[168px] pt-3.5">
                <TabsContent value="general" className="grid gap-3">
                  <Field label="Display name" htmlFor="hero-name">
                    <Input id="hero-name" defaultValue="Atelier North" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Timezone" htmlFor="hero-timezone">
                      <Select id="hero-timezone" defaultValue="ist">
                        <option value="ist">Asia / Kolkata</option>
                        <option value="cet">Europe / Berlin</option>
                        <option value="est">America / New York</option>
                      </Select>
                    </Field>
                    <Field label="Seats" htmlFor="hero-seats" hint="2 left on this plan">
                      <Input id="hero-seats" defaultValue="4" inputMode="numeric" />
                    </Field>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-ts-line pt-3">
                    <div>
                      <p className="text-[12.5px] font-medium leading-tight text-ts-ink">
                        Weekly digest
                      </p>
                      <p className="mt-0.5 text-[11px] leading-tight text-ts-muted">
                        One email, Friday morning.
                      </p>
                    </div>
                    <Switch defaultChecked label="" aria-label="Weekly digest" />
                  </div>
                </TabsContent>

                <TabsContent value="members" className="grid gap-2">
                  {people.map((person, index) => (
                    <div
                      key={person.alt}
                      className="flex items-center gap-2.5 rounded-[6px] border border-transparent px-1 py-1.5"
                    >
                      <Avatar alt={person.alt} size="sm" fallback={person.fallback} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium text-ts-ink">
                          {person.alt}
                        </p>
                        <p className="text-[10.5px] text-ts-muted">
                          {index === 0 ? "Owner" : index === 1 ? "Editor" : "Viewer"}
                        </p>
                      </div>
                      {index === 0 ? (
                        <Badge tone="accent">You</Badge>
                      ) : (
                        <button
                          type="button"
                          className="font-mono text-[9px] uppercase tracking-[0.1em] text-ts-muted hover:text-ts-ink"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  ))}
                  <Dialog
                    title="Invite a teammate"
                    description="They will get an email with a link to Atelier North."
                    trigger={
                      <Button variant="outline" size="sm" className="mt-1 w-full">
                        Invite a teammate
                      </Button>
                    }
                    footer={
                      <>
                        <DialogClose className="inline-flex h-8 items-center justify-center rounded-ts border border-transparent px-3 font-sans text-[12.5px] font-semibold text-ts-ink hover:bg-ts-surface-2">
                          Cancel
                        </DialogClose>
                        <DialogClose
                          onClick={() =>
                            toast({
                              title: "Invite sent",
                              description: "One seat is still open.",
                              tone: "success",
                            })
                          }
                          className="inline-flex h-8 items-center justify-center rounded-ts border border-transparent bg-ts-accent px-3 font-sans text-[12.5px] font-semibold text-ts-accent-ink hover:bg-ts-accent-hover"
                        >
                          Send invite
                        </DialogClose>
                      </>
                    }
                  >
                    <Field label="Email address" htmlFor="invite-email">
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="name@studio.example"
                      />
                    </Field>
                  </Dialog>
                </TabsContent>

                <TabsContent value="billing" className="grid gap-3">
                  <div className="flex items-start justify-between rounded-[7px] border border-ts-line bg-ts-surface-2 p-3">
                    <div>
                      <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ts-muted">
                        Current plan
                      </p>
                      <p className="mt-1 text-[14px] font-semibold text-ts-ink">
                        Studio · $24 / mo
                      </p>
                      <p className="mt-0.5 text-[11px] text-ts-muted">Renews 01 Dec 2026</p>
                    </div>
                    <Badge tone="success" dot>
                      Active
                    </Badge>
                  </div>
                  <p className="text-[11.5px] leading-relaxed text-ts-muted">
                    Six seats, unlimited projects, and the parts you already own.
                  </p>
                  <Button variant="outline" size="sm">
                    Manage billing
                  </Button>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <CardFooter className="mt-1 justify-between">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ts-muted">
              <PikaIcon icon={CheckTickSquareIcon} size={10} strokeWidth={1.8} />
              Saved just now
            </span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Discard
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  toast({
                    title: "Profile saved",
                    description: "Atelier North is up to date.",
                    tone: "success",
                  })
                }
              >
                Save changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="absolute inset-x-5 bottom-4 z-20 flex items-center justify-between gap-4">
        <ThemeSwitcher variant="rail" className="hidden sm:inline-flex" />
        <span className="hidden font-mono text-[8.5px] uppercase tracking-[0.13em] text-ts-muted sm:inline">
          Button × Field × Tabs × Switch
        </span>
      </div>
    </div>
  );
}
